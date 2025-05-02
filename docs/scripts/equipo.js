if (typeof firebase === 'undefined' || typeof firebase.app !== 'function' || !firebase.apps.length) {
    console.error("¡ERROR CRÍTICO! Firebase no inicializado antes de equipo.js. Revisa el orden de los scripts en el HTML.");
} else if (typeof correctFlags === 'undefined') {
     console.error("¡ERROR CRÍTICO! correctFlags no definido (¿config.js cargado antes?).");
} else {

    const db = firebase.database();

     const equipo = document.body.dataset.equipo;

    if (!equipo) {
        console.error("¡ERROR! No se pudo determinar el equipo. Falta 'data-equipo' en la etiqueta <body> del HTML.");
    } else {
        console.log(`Script cargado para el equipo: ${equipo}`);
    }

    function verificarFlag(numeroFlag) {
        if (!equipo) return;

        console.log(`Verificando flag ${numeroFlag} para ${equipo}`);

        const input = document.getElementById(`flag${numeroFlag}`);
        const resultado = document.getElementById(`flag${numeroFlag}-resultado`);
        const btn = document.getElementById(`btn-flag${numeroFlag}`);

        if (!input || !resultado || !btn) {
            console.error(`Error: No se encontraron los elementos HTML para flag ${numeroFlag}.`);
            return;
        }

        const userFlag = input.value.trim();
        const flagEsperada = correctFlags[numeroFlag];
        const flagEquipoRef = db.ref(`respuestas/${equipo}/flag${numeroFlag}`);

        btn.disabled = true;
        resultado.innerText = "Verificando...";
        resultado.style.color = "gray";

        console.log(`Input: '${userFlag}', Esperada: '${flagEsperada}'`);

        flagEquipoRef.once("value").then(snapshot => {
            console.log(`Firebase check para respuestas/${equipo}/flag${numeroFlag}. Respondido:`, snapshot.val());
            if (snapshot.val()) {
                resultado.innerText = "⚠️ Ya respondiste esta bandera.";
                resultado.style.color = "orange";
                return;
            }

            if (userFlag === flagEsperada) {
                console.log("¡Flag correcta!");
                resultado.innerText = "✅ ¡Flag Correcta!";
                resultado.style.color = "green";

                const puntajeRef = db.ref(`puntajes/${equipo}`);

                return puntajeRef.transaction(puntosActuales => {
                    console.log(`Transacción: Puntaje actual para ${equipo}: ${puntosActuales || 0}. Sumando 10.`);
                    return (puntosActuales || 0) + 10;
                }).then(result => {
                    if(result.committed) {
                        console.log("Puntaje actualizado exitosamente via transacción.");
                        return flagEquipoRef.set(true);
                    } else {
                         console.log("Transacción de puntaje no cometida.");
                         throw new Error("Conflicto al actualizar puntaje");
                    }
                }).then(() => {
                    console.log(`Flag ${numeroFlag} marcada como respondida para ${equipo}.`);
                });

            } else {
                console.log("Flag incorrecta.");
                resultado.innerText = "❌ Flag Incorrecta. Intenta de nuevo.";
                resultado.style.color = "red";
                btn.disabled = false;

                const nickname = localStorage.getItem('nickname') || "Anónimo";
                db.ref(`respuestas/${equipo}`).push({
                    flag: `flag${numeroFlag}`,
                    respuesta: userFlag,
                    correcta: false,
                    nombre: nickname,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
            }

        }).catch(error => {
            console.error(`Error verificando/actualizando flag ${numeroFlag} para ${equipo}:`, error);
            resultado.innerText = "⚠️ Error en el servidor. Intenta más tarde.";
            resultado.style.color = "red";
            if (!snapshot.val()) {
                 btn.disabled = false;
            }
        });
    }

    function inicializarEventos() {
        if (!equipo) return;
        console.log(`Inicializando listeners para los botones de ${equipo}`);
        for (let i = 1; i <= 5; i++) {
            const btn = document.getElementById(`btn-flag${i}`);
            if (btn) {
                btn.addEventListener("click", () => verificarFlag(i));
                console.log(`Listener añadido a btn-flag${i}`);
            } else {
                console.warn(`Botón btn-flag${i} no encontrado en el HTML.`);
            }
        }
    }

    function verificarBotonesRespondidos() {
        if (!equipo) return;
        console.log(`Verificando flags ya respondidas por ${equipo}`);
        for (let i = 1; i <= 5; i++) {
            const ref = db.ref(`respuestas/${equipo}/flag${i}`);
            ref.once("value").then(snapshot => {
                if (snapshot.val()) {
                    const btn = document.getElementById(`btn-flag${i}`);
                    if (btn) {
                        btn.disabled = true;
                        console.log(`Botón btn-flag${i} deshabilitado (ya respondido).`);
                        const resultado = document.getElementById(`flag${i}-resultado`);
                        if(resultado) {
                            resultado.innerText = "✔️ Respondida";
                            resultado.style.color = "green";
                        }
                    }
                }
            }).catch(error => {
                console.error(`Error al verificar estado del botón para flag ${i}:`, error);
            });
        }
    }

    window.addEventListener('load', () => {
       console.log(`DOM cargado para ${equipo}. Ejecutando inicialización.`);
       if (equipo) {
           inicializarEventos();
           verificarBotonesRespondidos();
       } else {
            console.error("No se pudo inicializar la página del equipo por falta de 'data-equipo'.");
       }
    });

}
