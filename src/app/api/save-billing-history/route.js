import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

initFirebaseAdmin();
const db = getFirestore();
const auth = getAuth();

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const { billing } = await req.json();

    if (!billing) {
      return new Response(JSON.stringify({ error: "Missing billing data" }), { status: 400 });
    }
    const billingData = {
      ...billing,
      invoice: `INV-${Date.now()}`,
      date: Timestamp.now(),
    };

    const userRef = db.collection("users").doc(uid).collection("billingHistory");
    const saved = await userRef.add(billingData);

    console.log("Billing history saved with ID:", saved.id);

    return new Response(JSON.stringify({ success: true, id: saved.id }), { status: 200 });
  } catch (err) {
    console.error("Failed to save billing history:", err);
    return new Response(JSON.stringify({ error: "Failed to save billing history" }), { status: 500 });
  }
}
