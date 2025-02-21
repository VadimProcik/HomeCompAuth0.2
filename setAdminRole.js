const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require('./testingauth-59.json'); // Replace with your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Assign admin role to a specific user
const setAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(`Admin role assigned to user: ${uid}`);
  } catch (error) {
    console.error("Error setting admin role:", error);
  }
};

// Replace with the actual user's UID
setAdminRole("FXzyykESyrWykFK50PfZvuyUrfO2");