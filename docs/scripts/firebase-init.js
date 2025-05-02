if (typeof firebase === 'undefined') {
    console.error("❌ Firebase SDK no está cargado. Asegúrate de incluir los scripts de Firebase antes de este archivo.");
} else if (typeof firebaseConfig === 'undefined') {
    console.error("❌ firebaseConfig no está definido. ¿Olvidaste cargar config.js antes?");
} else {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("✅ Firebase ha sido inicializado correctamente.");
        } else {
            console.log("ℹ️ Firebase ya estaba inicializado.");
        }
    } catch (error) {
        console.error("❌ Error al inicializar Firebase:", error);
    }
}
