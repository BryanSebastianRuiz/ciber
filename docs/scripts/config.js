// scripts/config.js

// ========================
// CONFIGURACIÓN FIREBASE
// ========================
// ¡IMPORTANTE! Considera seriamente mover la validación de flags y
// la actualización de puntajes a Firebase Cloud Functions para
// no exponer tu apiKey ni las flags correctas en el cliente.
const firebaseConfig = {
  apiKey: "AIzaSyCm8TcFviv-ciOMdNa8B8XH75SnwJAGA30",
  authDomain: "ciber-ed7c8.firebaseapp.com",
  databaseURL: "https://ciber-ed7c8-default-rtdb.firebaseio.com",
  projectId: "ciber-ed7c8",
  storageBucket: "ciber-ed7c8.firebasestorage.app",
  messagingSenderId: "777926247145",
  appId: "1:777926247145:web:9fbc58e6705c7e1a3f2678",
  measurementId: "G-49SY6GNXF9"
};

// ========================
// FLAGS CORRECTAS
// ========================
const correctFlags = {
    1: 'flag{pe_hidden_flag}',
    2: 'flag{malicious_traffic_found}',
    3: 'flag{welcome_to_ctf}',
    4: 'flag{digital_shadows}'
};

// Puedes añadir otras configuraciones globales aquí si es necesario