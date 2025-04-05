let puntaje = parseInt(localStorage.getItem("puntaje")) || 0;
let juegoActual = "";
let solucion = "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnMemoria").addEventListener("click", () => startGame("memoria"));
  document.getElementById("btnOperaciones").addEventListener("click", () => startGame("operaciones"));
  document.getElementById("btnSecuencias").addEventListener("click", () => startGame("secuencias"));
  document.getElementById("btnPuntaje").addEventListener("click", verPuntaje);
  document.getElementById("btnVerificar").addEventListener("click", verificar);
});

function startGame(tipo) {
  juegoActual = tipo;
  document.getElementById("menu").style.display = "none";
  document.getElementById("juego").style.display = "block";
  generarPregunta();
}

function generarPregunta() {
  const preguntaEl = document.getElementById("pregunta");
  const nivel = Math.floor(puntaje / 5) + 1;

  if (juegoActual === "memoria") {
    const longitud = 3 + nivel; // aumenta con el nivel
    solucion = "";
    for (let i = 0; i < longitud; i++) {
      solucion += Math.floor(Math.random() * 10);
    }
    preguntaEl.textContent = `Memoriza este número: ${solucion}`;
    setTimeout(() => {
      preguntaEl.textContent = "¿Cuál era el número?";
    }, 3000 + nivel * 200);
  }

  if (juegoActual === "operaciones") {
    const a = Math.floor(Math.random() * nivel * 10);
    const b = Math.floor(Math.random() * nivel * 10);
    const c = Math.floor(Math.random() * nivel * 5);
    const ops = ["+", "-", "*"];
    const op1 = ops[Math.floor(Math.random() * ops.length)];
    const op2 = ops[Math.floor(Math.random() * ops.length)];

    solucion = eval(`(${a} ${op1} ${b}) ${op2} ${c}`).toString();
    preguntaEl.textContent = `¿Cuánto es (${a} ${op1} ${b}) ${op2} ${c}?`;
  }

  if (juegoActual === "secuencias") {
    const inicio = Math.floor(Math.random() * 10);
    const paso = Math.floor(Math.random() * nivel) + 1;
    const longitud = 5 + nivel;
    const secuencia = [];

    for (let i = 0; i < longitud; i++) {
      secuencia.push(inicio + i * paso);
    }

    solucion = secuencia[longitud - 1].toString();
    secuencia[longitud - 1] = "...";
    preguntaEl.textContent = `Completa la secuencia: ${secuencia.join(", ")}`;
  }
}

function verificar() {
  const user = document.getElementById("respuesta").value.trim();
  if (user === solucion) {
    alert("✅ ¡Correcto!");
    puntaje++;
  } else {
    alert(`❌ Incorrecto. La respuesta era: ${solucion}`);
  }
  localStorage.setItem("puntaje", puntaje);
  document.getElementById("respuesta").value = "";
  document.getElementById("menu").style.display = "block";
  document.getElementById("juego").style.display = "none";
}

function verPuntaje() {
  alert(`🏆 Tu puntaje actual es: ${puntaje}`);
}
