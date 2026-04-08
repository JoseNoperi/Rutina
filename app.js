const diasData = {
"Lunes": {
timeline: [
"11:30 Desayuno (avena + huevo + plátano)",
"1:00 Universidad",
"6:00 Salida",
"6:10 Llegar gym",
"6:10-8:00 PUSH (pecho, hombro, tríceps)",
"8:30 Cena (pollo + arroz)",
"10:30 Rutina cara",
"12:00 Dormir"
]
},
"Martes": {
timeline: [
"11:30 Desayuno (huevos + tortillas + frijoles)",
"1:00 Universidad",
"7:00 Gym",
"7:00-9:00 PULL (espalda, bíceps)",
"9:30 Cena (pollo + tortillas)",
"10:45 Rutina cara",
"12:00 Dormir"
]
},
"Miércoles": {
timeline: [
"12:00 Desayuno (avena + fruta)",
"3:00 Universidad",
"7:00 Gym",
"7:00-9:00 LEGS (pierna completa)",
"9:30 Cena (carne + arroz)",
"10:45 Rutina cara",
"12:00 Dormir"
]
},
"Jueves": {
timeline: [
"12:00 Desayuno (huevos + tortillas)",
"3:00 Universidad",
"7:00 Gym",
"7:00-9:00 PUSH",
"9:30 Cena (pollo + arroz)",
"10:45 Rutina cara",
"12:00 Dormir"
]
},
"Viernes": {
timeline: [
"11:30 Desayuno (ligero)",
"12:30 Rutina en casa (flexiones + abs 30 min)",
"2:00 Universidad",
"8:00 Cena libre controlada",
"10:30 Rutina cara",
"12:00 Dormir"
]
},
"Sábado": {
timeline: [
"6:00 Uber",
"11:00 Desayuno (huevos + tortillas)",
"2:00 Snack",
"6:00 Regreso",
"8:00 Cena",
"10:30 Rutina cara",
"12:00 Dormir"
]
},
"Domingo": {
timeline: [
"6:00 Uber",
"11:00 Desayuno (avena + huevo)",
"2:00 Snack",
"6:00 Regreso",
"8:00 Cena",
"10:30 Rutina cara",
"12:00 Dormir"
]
}
};

const rutinaBase = [
"Rutina cara mañana",
"Desayuno",
"Comida",
"Snack",
"Gym / Actividad",
"Cena",
"Rutina cara noche",
"2L agua"
];

const daySelect = document.getElementById("day");
const checksDiv = document.getElementById("checks");

Object.keys(diasData).forEach(d => {
let opt = document.createElement("option");
opt.textContent = d;
daySelect.appendChild(opt);
});

function render() {
const day = daySelect.value;
checksDiv.innerHTML = "";

// TIMELINE
let timelineHTML = "<div class='card'><h3>📅 Día</h3>";
diasData[day].timeline.forEach(t => {
timelineHTML += `<p>${t}</p>`;
});
timelineHTML += "</div>";

checksDiv.innerHTML += timelineHTML;

// CHECKLIST
let data = JSON.parse(localStorage.getItem(day)) || [];

rutinaBase.forEach((r, i) => {
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
