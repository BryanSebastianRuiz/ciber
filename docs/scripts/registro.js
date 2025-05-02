window.addEventListener('DOMContentLoaded', () => {
    const equipo = document.body.dataset.equipo;
    const nickname = localStorage.getItem('nickname') || prompt("Ingresa tu nickname:");
  
    if (!nickname) {
      alert("Debes ingresar un nickname para continuar.");
      window.location.href = "index.html";
      return;
    }

    localStorage.setItem('nickname', nickname);

    const db = firebase.database();
    db.ref(`usuarios/${nickname}`).set({
      equipo: equipo,
      timestamp: new Date().toISOString()
    });
  });
  