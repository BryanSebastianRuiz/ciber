// server.js o routes/validate-flag.js

const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Bandera oficial protegida (solo en backend)
const correctFlags = {
  1: 'flag{pe_hidden_flag}',
  2: 'flag{malicious_traffic_found}',
  3: 'flag{welcome_to_ctf}',
  4: 'flag{digital_shadows}'
};

router.post('/validate-flag', async (req, res) => {
  const { flag, challengeId, equipo, nickname } = req.body;

  if (!flag || !challengeId || !equipo) {
    return res.status(400).json({ success: false, message: "Parámetros incompletos." });
  }

  const db = admin.database();
  const flagPath = `respuestas/${equipo}/flag${challengeId}`;
  const puntajePath = `puntajes/${equipo}`;

  try {
    const yaRespondida = await db.ref(flagPath).once('value');
    if (yaRespondida.exists()) {
      return res.json({ success: false, message: "⚠️ Ya respondiste esta bandera." });
    }

    const flagCorrecta = correctFlags[challengeId];
    if (flag === flagCorrecta) {
      // Aumentar puntaje y marcar como respondida
      await db.ref(puntajePath).transaction(p => (p || 0) + 10);
      await db.ref(flagPath).set(true);
      return res.json({ success: true, message: "✅ ¡Flag Correcta!" });
    } else {
      // Registrar intento fallido
      await db.ref(`respuestas/${equipo}`).push({
        flag: `flag${challengeId}`,
        respuesta: flag,
        correcta: false,
        nombre: nickname,
        timestamp: admin.database.ServerValue.TIMESTAMP
      });
      return res.json({ success: false, message: "❌ Flag Incorrecta." });
    }
  } catch (error) {
    console.error("Error en validación:", error);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

module.exports = router;
