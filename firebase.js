
// firebase.js
const admin = require("firebase-admin");
require("dotenv").config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

// If the privateKey contains literal \n sequences, convert them to newlines:
if (privateKey && privateKey.indexOf("\\n") !== -1) {
  privateKey = privateKey.replace(/\\n/g, "\n");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey
  }),
  // If using Realtime DB, set databaseURL here:
  // databaseURL: "https://<your-db>.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
