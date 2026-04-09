import React, { useState, useEffect } from "react";

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
  "Mandado",
];

const comidasPorDia = {
  Lunes: {
    desayuno: "80g avena + 2 huevos + 1 plátano",
    comida: "150g pollo + 150g arroz + verduras",
    cena: "120g atún + 2 tortillas + verduras",
  },
  Martes: {
    desayuno: "80g avena + 2 huevos + 1 manzana",
    comida: "150g carne molida + 150g arroz + verduras",
    cena: "120g pollo + 2 tortillas + verduras",
  },
  Miércoles: {
    desayuno: "80g avena + 2 huevos + 1 plátano",
    comida: "150g pollo + 150g arroz + verduras",
    cena: "120g atún + 2 tortillas + verduras",
  },
  Jueves: {
    desayuno: "80g avena + 2 huevos + 1 manzana",
    comida: "150g carne molida + 150g arroz + verduras",
    cena: "120g pollo + 2 tortillas + verduras",
  },
  Viernes: {
    desayuno: "80g avena + 2 huevos + 1 plátano",
    comida: "150g pollo + 150g arroz + verduras",
    cena: "120g atún + 2 tortillas + verduras",
  },
  Sábado: {
    desayuno: "80g avena + 2 huevos + 1 plátano",
    comida: "150g carne molida + 150g arroz + verduras",
    cena: "120g pollo + 2 tortillas + verduras",
  },
  Domingo: {
    desayuno: "80g avena + 2 huevos + 1 fruta",
    comida: "150g pollo o carne + 150g arroz + verduras",
    cena: "120g atún o pollo + 2 tortillas + verduras",
  },
};

const checklistBase = [
  "Rutina cara mañana",
  "Desayuno",
  "Comida",
  "Snack",
  "Gym / Actividad",
  "Cena",
  "Rutina cara noche",
  "2L agua",
];

const mandado = [
  "2–3 kg pollo",
  "1 kg arroz",
  "30 huevos",
  "5–6 latas de atún",
  "Tortillas",
  "1 kg avena",
  "Crema de cacahuate",
  "Verduras",
  "Fruta",
];

export default function App() {
  const [dia, setDia] = useState("Lunes");
  const [checks, setChecks] = useState(() => {
    const data = localStorage.getItem("rutina");
    return data ? JSON.parse(data) : {};
  });

  useEffect(() => {
    localStorage.setItem("rutina", JSON.stringify(checks));
  }, [checks]);

  const toggle = (d, item) => {
    setChecks((prev) => ({
      ...prev,
      [d]: {
        ...prev[d],
        [item]: !prev?.[d]?.[item],
      },
    }));
  };

  const progreso = (d) => {
    const total = checklistBase.length;
    const done = checklistBase.filter((i) => checks?.[d]?.[i]).length;
    return Math.round((done / total) * 100);
  };

  // RESET AUTOMÁTICO
  useEffect(() => {
    if (progreso("Domingo") === 100) {
      localStorage.removeItem("rutina");
      setChecks({});
    }
  }, [checks]);

  const resetManual = () => {
    localStorage.removeItem("rutina");
    setChecks({});
  };

  const rutinaCara = (d) => {
    const hielo = ["Martes", "Jueves", "Sábado"].includes(d);
    return [
      "Lavar cara",
      "Agua fría",
      hielo ? "Agua con hielo (1-2 min)" : null,
      "Secar sin tallar",
      "Crema hidratante",
      "Protector solar",
    ].filter(Boolean);
  };

  const rutinaGym = (d) => {
    const rutinas = {
      Lunes: "PUSH → Press plano, inclinado, aperturas, press militar, laterales, tríceps",
      Martes: "PULL → Dominadas, remo, jalón, curl barra, mancuernas",
      Miércoles: "PIERNA → Sentadilla, prensa, extensión, femoral, pantorrilla",
      Jueves: "PUSH → Repetición con variaciones",
      Viernes: "Casa → Lagartijas, abdominales",
      Sábado: "Trabajo",
      Domingo: "Trabajo",
    };
    return rutinas[d];
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Rutina</h1>

      {/* DIAS */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {dias.map((d) => (
          <button key={d} onClick={() => setDia(d)}>
            {d}
          </button>
        ))}
      </div>

      {/* CONTENIDO */}
      {dia !== "Mandado" && (
        <>
          <h2>{dia}</h2>

          {/* CARA */}
          <h3>🧴 Cuidado de la cara</h3>
          {rutinaCara(dia).map((step) => (
            <div key={step}>• {step}</div>
          ))}

          {/* COMIDA */}
          <h3>🍽️ Comidas</h3>
          <table border="1" cellPadding="5">
            <tbody>
              <tr>
                <td>Desayuno</td>
                <td>{comidasPorDia[dia].desayuno}</td>
              </tr>
              <tr>
                <td>Comida</td>
                <td>{comidasPorDia[dia].comida}</td>
              </tr>
              <tr>
                <td>Cena</td>
                <td>{comidasPorDia[dia].cena}</td>
              </tr>
            </tbody>
          </table>

          {/* GYM */}
          <h3>🏋️ Rutina</h3>
          <div>{rutinaGym(dia)}</div>

          {/* CHECKLIST */}
          <h3>✅ Checklist</h3>
          {checklistBase.map((item) => (
            <label key={item} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={checks?.[dia]?.[item] || false}
                onChange={() => toggle(dia, item)}
              />
              {item}
            </label>
          ))}

          {/* PROGRESO */}
          <h3>Progreso: {progreso(dia)}%</h3>
          <div style={{ height: 10, background: "#ddd", borderRadius: 10 }}>
            <div
              style={{
                width: `${progreso(dia)}%`,
                height: "100%",
                background: "green",
                borderRadius: 10,
              }}
            />
          </div>

          {/* RESET */}
          <button onClick={resetManual} style={{ marginTop: 15 }}>
            Reiniciar semana
          </button>
        </>
      )}

      {/* MANDADO */}
      {dia === "Mandado" && (
        <>
          <h2>🛒 Mandado</h2>
          {mandado.map((item) => (
            <label key={item} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={checks?.Mandado?.[item] || false}
                onChange={() => toggle("Mandado", item)}
              />
              {item}
            </label>
          ))}
        </>
      )}
    </div>
  );
}

</body>
</html>
