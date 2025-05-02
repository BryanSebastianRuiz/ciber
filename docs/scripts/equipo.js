// equipo.js
for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`btn-flag${i}`);
    if (btn) {
      btn.addEventListener('click', () => verificarFlag(i));
    }
  }
  
  async function verificarFlag(numeroFlag) {
    const equipo = document.body.dataset.equipo;
    const input = document.getElementById(`flag${numeroFlag}`);
    const resultado = document.getElementById(`flag${numeroFlag}-resultado`);
    const btn = document.getElementById(`btn-flag${numeroFlag}`);
    const userFlag = input.value.trim();
  
    btn.disabled = true;
    resultado.innerText = "Verificando...";
    resultado.style.color = "gray";
  
    try {
      const response = await fetch('/api/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipo,
          numeroFlag,
          flagIngresada: userFlag
        })
      });
  
      const data = await response.json();
  
      if (data.correcta) {
        resultado.innerText = "✅ ¡Flag Correcta!";
        resultado.style.color = "green";
  
        firebase.database().ref(`respuestas/${equipo}/flag${numeroFlag}`).set(true);
        const puntajeRef = firebase.database().ref(`puntajes/${equipo}`);
        puntajeRef.transaction(p => (p || 0) + 10);
      } else {
        resultado.innerText = "❌ Flag Incorrecta. Intenta de nuevo.";
        resultado.style.color = "red";
        btn.disabled = false;
      }
  
    } catch (error) {
      console.error("Error al verificar flag:", error);
      resultado.innerText = "⚠️ Error en el servidor.";
      resultado.style.color = "red";
      btn.disabled = false;
    }
  }
  