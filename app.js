const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

const rutina = [
"Rutina cara AM",
"Comida 1",
"Snack",
"Escuela / Trabajo",
"Gym",
"Cena",
"Rutina cara PM"
];

const daySelect = document.getElementById("day");
const checksDiv = document.getElementById("checks");

// llenar días
dias.forEach(d => {
    let opt = document.createElement("option");
    opt.textContent = d;
    daySelect.appendChild(opt);
});

// render checklist
function render() {
    checksDiv.innerHTML = "";
    const day = daySelect.value;
    let data = JSON.parse(localStorage.getItem(day)) || [];

    rutina.forEach((r, i) => {
        let div = document.createElement("div");
        div.className = "check";

        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = data[i] || false;

        input.onchange = () => {
            data[i] = input.checked;
            localStorage.setItem(day, JSON.stringify(data));
        };

        div.appendChild(input);
        div.append(" " + r);
        checksDiv.appendChild(div);
    });
}

daySelect.onchange = render;
render();

// PESO + GRÁFICA
function guardarPeso() {
    let peso = document.getElementById("peso").value;
    if (!peso) return;

    let historial = JSON.parse(localStorage.getItem("pesos")) || [];
    historial.push(parseFloat(peso));

    localStorage.setItem("pesos", JSON.stringify(historial));
    dibujarGrafica();
}

function dibujarGrafica() {
    const canvas = document.getElementById("grafica");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 150;

    let data = JSON.parse(localStorage.getItem("pesos")) || [];

    ctx.clearRect(0,0,300,150);

    data.forEach((p, i) => {
        let x = i * 30;
        let y = 150 - (p * 2);

        ctx.fillRect(x, y, 5, 5);
    });
}

dibujarGrafica();
