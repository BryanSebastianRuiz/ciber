function validarFlag(flagIngresada, challengeId) {
  fetch('https://ctf-api-yourname.vercel.app/api/validate-flag', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      flag: flagIngresada,
      challengeId: challengeId
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.success) {
      // Aquí puedes actualizar el puntaje, etc.
    }
  })
  .catch(err => {
    console.error("Error en la validación:", err);
    alert("Error al validar flag.");
  });
}
