var admin = require("firebase-admin");
var serviceAccount = require("../sa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usfl-dynasty-values.firebaseio.com"
});

var db = admin.firestore();

module.exports = db;