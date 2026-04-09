// APP PRO MAX ULTRA (CORREGIDO BIEN HECHO Y REALISTA)

const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// COMIDAS (VOLUMEN LIMPIO REAL)
const comidas = {
Lunes:[
{n:"Desayuno",d:"4 huevos + 2 tortillas + 1 plátano"},
{n:"Comida",d:"180g pollo + 1 taza arroz + verduras"},
{n:"Cena",d:"150g pollo + 1 papa"}
],
Martes:[
{n:"Desayuno",d:"Avena 1 taza + leche + plátano"},
{n:"Comida",d:"180g carne + arroz"},
{n:"Cena",d:"3 huevos + 2 tortillas"}
],
Miércoles:[
{n:"Desayuno",d:"4 huevos + pan"},
{n:"Comida",d:"180g pollo + pasta"},
{n:"Cena",d:"Atún + tostadas"}
],
Jueves:[
{n:"Desayuno",d:"Avena + plátano"},
{n:"Comida",d:"180g carne + arroz"},
{n:"Cena",d:"Huevos + tortillas"}
],
Viernes:[
{n:"Desayuno",d:"4 huevos + tortillas"},
{n:"Comida",d:"Libre controlado"},
{n:"Cena",d:"Ligero proteína"}
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

// RUTINA GYM COMPLETA REAL
const ejercicios = {
Lunes:[
"Press banca 4x8-10",
"Press inclinado 4x8-10",
"Aperturas 3x12",
"Press militar 4x8",
"Elevaciones laterales 3x12",
"Fondos 3x12",
"Extensión tríceps 3x12"
],
Martes:[
"Dominadas 4x6-8",
"Remo barra 4x8-10",
"Jalón polea 3x10",
"Face pull 3x12",
"Curl bíceps barra 3x10",
"Curl alterno 3x12"
],
Miércoles:[
"Sentadilla 4x8",
"Prensa 4x10",
"Extensión cuadriceps 3x12",
"Curl femoral 3x12",
"Pantorrilla 4x15"
],
Jueves:[
"Press banca inclinado 4x8",
"Aperturas 3x12",
"Press militar 4x8",
"Laterales 3x12",
"Fondos 3x12",
"Tríceps polea 3x12"
],
Viernes:[
"Flexiones 4x15",
"Abdominales 4x20",
"Plancha 3x1 min"
],
Sábado:["Descanso"],
Domingo:["Descanso"]
};

// RUTINA CARA CON DÍAS CORRECTOS
function getRutinaCara(day){
let base=["Limpiar cara","Serum","Hidratante"];
if(["Martes","Jueves","Sábado"].includes(day)){
base.splice(1,0,"Hielo 1-2 min");
}
if(day!=="Noche") base.push("Bloqueador");
return base;
}

const rutinaBase = [
"Rutina cara mañana","Desayuno","Comida","Snack","Entrenamiento","Cena","Rutina cara noche","2L agua"
];

const daySelect=document.getElementById("day");
const checksDiv=document.getElementById("checks");
const statsDiv=document.getElementById("stats");

dias.forEach(d=>{
let opt=document.createElement("option");
opt.textContent=d;
daySelect.appendChild(opt);
});

// PESO MEJOR UI
function saveWeight(){
let w=document.getElementById("peso").value;
localStorage.setItem("peso",w);
}
function getWeight(){return localStorage.getItem("peso")||"";}

// IA
function IA(p){
if(p<50)return"Vas flojo, mejora disciplina";
if(p<100)return"Vas bien, sigue así";
return"Perfecto, día completo";
}

function render(){
let day=daySelect.value;
checksDiv.innerHTML="";

let data=JSON.parse(localStorage.getItem(day))||[];
let completed=0;

// COMIDAS
let html=`<div class='card'><h3>🍽️ Comidas</h3><table>`;
comidas[day].forEach(c=>html+=`<tr><td>${c.n}</td><td>${c.d}</td></tr>`);
html+=`</table></div>`;

// GYM
html+=`<div class='card'><h3>🏋️ Rutina</h3>`;
ejercicios[day].forEach(e=>html+=`<p>${e}</p>`);
html+=`</div>`;

// CARA
html+=`<div class='card'><h3>🧴 Cara</h3>`;
getRutinaCara(day).forEach(r=>html+=`<p>${r}</p>`);
html+=`</div>`;

// FIN DE SEMANA
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
<div style='display:flex;align-items:center;gap:10px;margin-top:10px'>
<label>⚖️</label>
<input id='peso' style='flex:1;padding:6px;border-radius:8px;border:1px solid #ccc' placeholder='Tu peso' value='${getWeight()}' oninput='saveWeight()'>
</div>
<p>${IA(percent)}</p>
</div>`;
}

if("Notification"in window)Notification.requestPermission();

setInterval(()=>{
let h=new Date().getHours();
if(h===11)new Notification("Desayuno");
if(h===18)new Notification("Gym");
if(h===22)new Notification("Cara");
},60000);


daySelect.onchange=render;
render();
