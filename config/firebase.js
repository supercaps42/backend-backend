const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

function initFirebaseAdmin() {
  if (admin.apps && admin.apps.length) return admin;

  let serviceAccount = null;

  try {
    const localPath = path.join(__dirname, "tugasakhir.json");
    if (fs.existsSync(localPath)) {
      serviceAccount = require(localPath);
    }
  } catch (err) {
    console.warn(
      "Firebase Admin: failed to load local tugasakhir.json",
      err.message
    );
  }

  if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (err) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON");
    }
  }

  else if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    try {
      serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    } catch (err) {
      throw new Error(
        "Cannot load service account from FIREBASE_SERVICE_ACCOUNT_PATH: " +
          err.message
      );
    }
  }

  else if (
    !serviceAccount &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PROJECT_ID
  ) {
    serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: String(process.env.FIREBASE_PRIVATE_KEY).replace(
        /\\n/g,
        "\n"
      ),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    };
  }

  else if (!serviceAccount && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
    return admin;
  } else if (!serviceAccount) {
    throw new Error(
      "Firebase service account not configured. Set FIREBASE_SERVICE_ACCOUNT_KEY (JSON), FIREBASE_SERVICE_ACCOUNT_PATH, provide FIREBASE_PRIVATE_KEY/FIREBASE_CLIENT_EMAIL/FIREBASE_PROJECT_ID, or add backend/config/tugasakhir.json."
    );
  }

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  return admin;
}

module.exports = initFirebaseAdmin();
