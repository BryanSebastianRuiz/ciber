// scripts/equipo.js

const API_URL = "https://ctf-api.vercel.app/api/validate-flag"; // Cambia si usas otro dominio
const equipo = document.body.dataset.equipo;
const nickname = localStorage.getItem('nickname') || "Anónimo";

function validarFlag(challengeId) {
    const input = document.getElementById(`flag${challengeId}`);
    const resultado = document.getElementById(`flag${challengeId}-resultado`);
    const btn = document.getElementById(`btn-flag${challengeId}`);

    if (!input || !resultado || !btn) return;

    const flag = input.value.trim();

    if (!flag) {
        resultado.innerText = "⚠️ Ingresa una flag primero.";
        resultado.style.color = "orange";
        return;
    }

    btn.disabled = true;
    resultado.innerText = "Verificando...";
    resultado.style.color = "gray";

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag, challengeId, equipo, nickname })
    })
    .then(res => res.json())
    .then(data => {
        resultado.innerText = data.message;
        resultado.style.color = data.success ? "green" : "red";
        if (!data.success) btn.disabled = false;
    })
    .catch(err => {
        console.error("Error al contactar la API:", err);
        resultado.innerText = "❌ Error de red.";
        resultado.style.color = "red";
        btn.disabled = false;
    });
}

function inicializarBotones() {
    for (let i = 1; i <= 5; i++) {
        const btn = document.getElementById(`btn-flag${i}`);
        if (btn) {
            btn.addEventListener("click", () => validarFlag(i));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (!equipo) {
        console.error("Falta atributo data-equipo en el <body>.");
        return;
    }
    inicializarBotones();
});
