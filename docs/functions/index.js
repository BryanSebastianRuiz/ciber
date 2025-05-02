const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const correctFlags = {
    1: 'flag{pe_hidden_flag}',
    2: 'flag{malicious_traffic_found}',
    3: 'flag{welcome_to_ctf}',
    4: 'flag{digital_shadows}'
};

exports.validateFlag = functions.https.onCall((data, context) => {
    const { challengeId, submittedFlag } = data;

    if (!challengeId || !submittedFlag) {
        throw new functions.https.HttpsError("invalid-argument", "Datos incompletos");
    }

    const correct = correctFlags[challengeId];

    if (correct && submittedFlag.trim() === correct.trim()) {
        return { success: true, message: "¡Flag correcta!" };
    } else {
        return { success: false, message: "Flag incorrecta." };
    }
});
