// APP PRO MAX COMPLETA (TODO CORREGIDO)

const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// COMIDAS COMPLETAS TODOS LOS DÍAS
const comidas = {
Lunes:[
{n:"Desayuno",d:"3 huevos + 2 tortillas + 1 plátano"},
{n:"Comida",d:"150g pollo + 1 taza arroz"},
{n:"Cena",d:"150g pollo + verduras"}
],
Martes:[
{n:"Desayuno",d:"Avena (1 taza) + leche"},
{n:"Comida",d:"150g carne + arroz"},
{n:"Cena",d:"3 huevos + tortillas"}
],
Miércoles:[
{n:"Desayuno",d:"3 huevos + pan"},
{n:"Comida",d:"150g pollo + pasta"},
{n:"Cena",d:"Atún + tostadas"}
],
Jueves:[
{n:"Desayuno",d:"Avena + plátano"},
{n:"Comida",d:"150g carne + arroz"},
{n:"Cena",d:"Huevos + tortillas"}
],
Viernes:[
{n:"Desayuno",d:"3 huevos + tortillas"},
{n:"Comida",d:"Comida libre controlada"},
{n:"Cena",d:"Ligero (atún o pollo)"}
],
Sábado:[
{n:"Desayuno",d:"Huevos + tortillas"},
{n:"Comida",d:"Pollo + arroz"},
{n:"Cena",d:"Ligero"}
],
Domingo:[
{n:"Desayuno",d:"Avena + huevo"},
{n:"Comida",d:"Carne + arroz"},
{n:"Cena",d:"Ligero"}
]
};

// EJERCICIOS
const ejercicios = {
Lunes:["Press banca 4x10","Press militar 4x10","Fondos 3x12"],
Martes:["Dominadas 4x8","Remo 4x10","Curl bíceps 3x12"],
Miércoles:["Sentadilla 4x10","Prensa 4x10","Pantorrilla 3x15"],
Jueves:["Press banca inclinado 4x10","Laterales 3x12","Tríceps 3x12"],
Viernes:["Flexiones + abs en casa"],
Sábado:["Descanso"],
Domingo:["Descanso"]
};

// RUTINA CARA
const rutinaCara = [
"Limpiar cara",
"Hielo (1-2 min)",
"Serum",
"Hidratante",
"Bloqueador (mañana)"
];

const rutinaBase = [
"Rutina cara mañana","Desayuno","Comida","Snack","Entrenamiento","Cena","Rutina cara noche","2L agua"
];

const daySelect = document.getElementById("day");
const checksDiv = document.getElementById("checks");
const statsDiv = document.getElementById("stats");

// llenar días
dias.forEach(d=>{
let opt=document.createElement("option");
opt.textContent=d;
daySelect.appendChild(opt);
});

// PESO
function saveWeight(){
let w=document.getElementById("peso").value;
localStorage.setItem("peso",w);
}
function getWeight(){return localStorage.getItem("peso")||"";}

// IA
function IA(p){
if(p<50)return"Vas flojo, ponte serio 🔥";
if(p<100)return"Vas bien, termina fuerte 💪";
return"Perfecto, disciplina total 😈";
}

function render(){
let day=daySelect.value;
checksDiv.innerHTML="";

let data=JSON.parse(localStorage.getItem(day))||[];
let completed=0;

// COMIDAS
let html=`<div class='card'><h3>🍽️ Comidas</h3><table>`;
comidas[day].forEach(c=>{
html+=`<tr><td>${c.n}</td><td>${c.d}</td></tr>`;
});
html+=`</table></div>`;

// EJERCICIOS
html+=`<div class='card'><h3>🏋️ Gym</h3>`;
ejercicios[day].forEach(e=>html+=`<p>${e}</p>`);
html+=`</div>`;

// RUTINA CARA
html+=`<div class='card'><h3>🧴 Rutina Cara</h3>`;
rutinaCara.forEach(r=>html+=`<p>${r}</p>`);
html+=`</div>`;

// FIN DE SEMANA ACTIVIDAD
if(day==="Sábado"||day==="Domingo"){
html+=`<div class='card'><h3>💼 Actividad</h3><p>Uber / Trabajo</p></div>`;
}

checksDiv.innerHTML=html;

// CHECKLIST
rutinaBase.forEach((r,i)=>{
let div=document.createElement("div");
let input=document.createElement("input");
input.type="checkbox";
input.checked=data[i]||false;

if(input.checked)completed++;

input.onchange=()=>{
data[i]=input.checked;
localStorage.setItem(day,JSON.stringify(data));
render();
};

div.appendChild(input);
div.append(" "+r);
checksDiv.appendChild(div);
});

let percent=Math.round((completed/rutinaBase.length)*100);

statsDiv.innerHTML=`
<div class='card'>
<h3>📊 Progreso</h3>
<p>${percent}%</p>
<div style='margin-top:10px'>
<label>⚖️ Peso:</label>
<input id='peso' style='width:100%;padding:8px;margin-top:5px' value='${getWeight()}' oninput='saveWeight()'>
</div>
<p>${IA(percent)}</p>
</div>`;
}

// NOTIS
if("Notification"in window)Notification.requestPermission();

setInterval(()=>{
let h=new Date().getHours();
if(h===11)new Notification("Desayuno");
if(h===18)new Notification("Gym");
if(h===22)new Notification("Cara");
},60000);


daySelect.onchange=render;
render();
