if (typeof firebase === 'undefined' || typeof firebase.app !== 'function' || !firebase.apps.length) {
  console.error("¡ERROR CRÍTICO! Firebase no inicializado antes de tabla.js. Revisa el orden de los scripts.");
} else {

  const db = firebase.database();

  function actualizarTabla(puntajes) {
      const tabla = document.getElementById('tabla-puntajes');
      const tablaGlobal = document.getElementById('global-score-table');

      const targetTableBody = tabla ? tabla.tBodies[0] : (tablaGlobal ? tablaGlobal.tBodies[0] : null);

      if (!targetTableBody) {
           return;
      }

      targetTableBody.innerHTML = '';

      let scoreData = [
          { equipo: 'Rojo', puntaje: puntajes.Rojo || 0 },
          { equipo: 'Morado', puntaje: puntajes.Morado || 0 },
          { equipo: 'Azul', puntaje: puntajes.Azul || 0 }
      ];

      if (tablaGlobal) {
           scoreData.sort((a, b) => b.puntaje - a.puntaje);
      }

      scoreData.forEach(item => {
          const row = targetTableBody.insertRow();
          const cellEquipo = row.insertCell();
          const cellPuntaje = row.insertCell();

          cellEquipo.textContent = item.equipo;
          cellPuntaje.textContent = item.puntaje;

           if (tabla && document.body.dataset.equipo === item.equipo) {
           }
      });
  }

  function escucharPuntajes() {
      const puntajesRef = db.ref("puntajes");

      puntajesRef.on("value", snapshot => {
          const datos = snapshot.val() || { Rojo: 0, Morado: 0, Azul: 0 };
          console.log("Puntajes recibidos por tabla.js:", datos);
          actualizarTabla(datos);

          if (typeof actualizarColorFondoScoreboard === 'function') {
               actualizarColorFondoScoreboard(datos);
          }

      }, error => {
           console.error("Error al escuchar puntajes en tabla.js:", error);
           const tabla = document.getElementById('tabla-puntajes');
           if (tabla) tabla.innerHTML = '<tr><td colspan="2" style="color:red;">Error al cargar puntajes</td></tr>';
           const tablaGlobal = document.getElementById('global-score-table');
            if (tablaGlobal) tablaGlobal.innerHTML = '<tr><td colspan="2" style="color:red;">Error al cargar puntajes</td></tr>';
      });
  }

  window.addEventListener('DOMContentLoaded', () => {
       console.log("DOM cargado. Iniciando escucha de puntajes desde tabla.js.");
       escucharPuntajes();
  });

}