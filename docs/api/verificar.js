const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

module.exports = functions.https.onRequest((req, res) => {
  const flag = req.query.flag;

  const validFlags = ["FLAG{123}", "FLAG{456}", "FLAG{789}"];
  
  if (validFlags.includes(flag)) {
    res.status(200).send({ result: "Flag correcta" });
  } else {
    res.status(400).send({ result: "Flag incorrecta" });
  }
});
