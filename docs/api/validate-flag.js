// Importar dependencias
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inicializar Firebase Admin
admin.initializeApp();

// Función para validar la flag
module.exports = functions.https.onRequest((req, res) => {
  const flag = req.query.flag;  // Recibe la flag como parámetro en la URL

  // Aquí deberías agregar tu lógica para validar la flag
  // Ejemplo de validación
  const validFlags = ["FLAG{123}", "FLAG{456}", "FLAG{789}"];
  
  if (validFlags.includes(flag)) {
    res.status(200).send({ result: "Flag válida" });
  } else {
    res.status(400).send({ result: "Flag no válida" });
  }
});
