import admin from "firebase-admin";

let serviceAccount = {};

try {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || "";
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  serviceAccount = JSON.parse(decoded);

  if (typeof serviceAccount.project_id !== "string") {
    throw new Error("Missing project_id in service account");
  }
} catch (err) {
  console.error("Invalid FIREBASE_SERVICE_ACCOUNT_BASE64:", err);
}

function initFirebaseAdmin() {
  if (!admin.apps.length) {
    console.log(serviceAccount);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export { initFirebaseAdmin };
export default admin;
