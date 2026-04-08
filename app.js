// APP PRO MAX VERSION (UI + comidas tabla + ejercicios + peso + IA básica)

const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

const comidas = {
Lunes: [
  {nombre:"Desayuno", detalle:"3 huevos + 2 tortillas + 1 plátano"},
  {nombre:"Comida", detalle:"150g pollo + 1 taza arroz"},
  {nombre:"Cena", detalle:"150g pollo + verduras"}
],
Martes: [
  {nombre:"Desayuno", detalle:"Avena 1 taza + leche"},
  {nombre:"Comida", detalle:"150g carne + arroz"},
  {nombre:"Cena", detalle:"Huevos + tortillas"}
]
};

const ejercicios = {
Lunes: ["Press banca 4x10","Press militar 4x10","Fondos 3x12"],
Martes: ["Dominadas 4x8","Remo 4x10","Curl bíceps 3x12"],
Miércoles: ["Sentadilla 4x10","Prensa 4x10","Pantorrilla 3x15"]
};

const rutinaBase = [
"Rutina cara mañana","Desayuno","Comida","Snack","Entrenamiento","Cena","Rutina cara noche","2L agua"
];

const daySelect = document.getElementById("day");
const checksDiv = document.getElementById("checks");
const statsDiv = document.getElementById("stats");

// llenar días
dias.forEach(d => {
  let opt = document.createElement("option");
  opt.textContent = d;
  daySelect.appendChild(opt);
});

// peso
function saveWeight() {
  let w = document.getElementById("peso").value;
  localStorage.setItem("peso", w);
}

function getWeight() {
  return localStorage.getItem("peso") || "";
}

// IA básica
function sugerenciaIA(percent) {
  if (percent < 50) return "Vas flojo, échale ganas 🔥";
  if (percent < 100) return "Vas bien, termina fuerte 💪";
  return "Día perfecto, máquina 😈";
}

function render() {
  let day = daySelect.value;
  checksDiv.innerHTML = "";

  let data = JSON.parse(localStorage.getItem(day)) || [];
  let completed = 0;

  // COMIDAS TABLA
  let comidasHTML = `<div class='card'><h3>🍽️ Comidas</h3><table>`;
  (comidas[day] || []).forEach(c => {
    comidasHTML += `<tr><td>${c.nombre}</td><td>${c.detalle}</td></tr>`;
  });
  comidasHTML += `</table></div>`;

  // EJERCICIOS
  let gymHTML = `<div class='card'><h3>🏋️ Ejercicios</h3>`;
  (ejercicios[day] || []).forEach(e => {
    gymHTML += `<p>${e}</p>`;
  });
  gymHTML += `</div>`;

  checksDiv.innerHTML += comidasHTML + gymHTML;

  // CHECKLIST
  rutinaBase.forEach((r,i) => {
    let div = document.createElement("div");
    div.className = "check";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = data[i] || false;

    if (input.checked) completed++;

    input.onchange = () => {
      data[i] = input.checked;
      localStorage.setItem(day, JSON.stringify(data));
      render();
    };

    div.appendChild(input);
    div.append(" " + r);
    checksDiv.appendChild(div);
  });

  let percent = Math.round((completed / rutinaBase.length) * 100);

  statsDiv.innerHTML = `
  <div class='card'>
    <h3>📊 Progreso</h3>
    <p>${percent}%</p>
    <p>⚖️ Peso: <input id='peso' value='${getWeight()}' oninput='saveWeight()'></p>
    <p>${sugerenciaIA(percent)}</p>
  </div>
  `;
}

// NOTIFICACIONES
if ("Notification" in window) {
  Notification.requestPermission();
}

setInterval(() => {
  let h = new Date().getHours();
  if (h === 11) new Notification("🍳 Desayuno");
  if (h === 18) new Notification("🏋️ Gym");
  if (h === 22) new Notification("🧴 Rutina cara");
}, 60000);


daySelect.onchange = render;
render();

