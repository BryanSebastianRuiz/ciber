const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// FLAGS secretas (sólo backend)
const correctFlags = {
  1: "flag{pe_hidden_flag}",
  2: "flag{malicious_traffic_found}",
  3: "flag{welcome_to_ctf}",
  4: "flag{digital_shadows}"
};

// Función para validar flags
exports.validateFlag = functions.https.onCall((data, context) => {
  const { flag, challengeId } = data;

  if (!flag || !challengeId) {
    return { success: false, message: "Faltan datos." };
  }

  const expected = correctFlags[challengeId];
  if (!expected) {
    return { success: false, message: "Desafío no válido." };
  }

  const success = flag.trim() === expected;

  return {
    success,
    message: success ? "✅ Flag correcta" : "❌ Flag incorrecta"
  };
});
