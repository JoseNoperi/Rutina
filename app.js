const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

const rutinaBase = [
"Rutina cara mañana",
"Desayuno",
"Comida",
"Snack",
"Entrenamiento",
"Cena",
"Rutina cara noche",
"2L agua"
];

const daySelect = document.getElementById("day");
const checksDiv = document.getElementById("checks");
const statsDiv = document.getElementById("stats");

// llenar select
dias.forEach(d => {
  let opt = document.createElement("option");
  opt.textContent = d;
  daySelect.appendChild(opt);
});

// STREAK
function getToday() {
  return new Date().toLocaleDateString();
}

function updateStreak(done) {
  let streak = parseInt(localStorage.getItem("streak") || 0);
  let last = localStorage.getItem("last");

  if (done && last !== getToday()) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("last", getToday());
  }
}

// render
function render() {
  let day = daySelect.value;
  checksDiv.innerHTML = "";

  let data = JSON.parse(localStorage.getItem(day)) || [];
  let completed = 0;

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
  <div class="card">
    <h3>📊 Progreso</h3>
    <p>${percent}% completado</p>
    <p>🔥 Racha: ${localStorage.getItem("streak") || 0}</p>
  </div>
  `;

  if (percent === 100) updateStreak(true);
}

// NOTIFICACIONES
if ("Notification" in window) {
  Notification.requestPermission();
}

setInterval(() => {
  let h = new Date().getHours();

  if (h === 11) new Notification("🍳 Desayuno");
  if (h === 18) new Notification("🏋️ Gym");
  if (h === 22) new Notification("🧴 Cara");
}, 60000);

daySelect.onchange = render;
render();

daySelect.onchange = render;
render();
