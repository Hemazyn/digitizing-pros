import { getFirestore } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "@/lib/firebaseAdmin";

initFirebaseAdmin();
const db = getFirestore();

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing uid" }), { status: 400 });
    }

    const snapshot = await db.collection("users").doc(uid).collection("billingHistory").orderBy("date", "desc").get();

    const history = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: data.date?.toDate().toLocaleString(),
      };
    });

    return new Response(JSON.stringify({ history }), { status: 200 });
  } catch (err) {
    console.error("Error fetching billing history:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch billing history" }), { status: 500 });
  }
}
