import admin from "firebase-admin";

function getServiceAccountFromEnv() {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!base64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is not set.");
  }

  try {
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const serviceAccount = JSON.parse(decoded);

    if (typeof serviceAccount.project_id !== "string") {
      throw new Error("Missing or invalid 'project_id' in service account.");
    }

    return serviceAccount;
  } catch (err) {
    console.error("Invalid FIREBASE_SERVICE_ACCOUNT_BASE64:", err);
    throw new Error("Failed to parse Firebase service account.");
  }
}

function initFirebaseAdmin() {
  if (!admin.apps.length) {
    const serviceAccount = getServiceAccountFromEnv();

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export { initFirebaseAdmin };
export default admin;
