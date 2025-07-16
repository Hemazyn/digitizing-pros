import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

// Firebase Admin init (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

// Webhook handler
export async function POST(req) {
  const rawBody = await req.text();
  const sig = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Process successful checkout session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const cartItems = JSON.parse(session.metadata?.cartItems || "[]");
    const email = session.customer_email;

    try {
      await db.collection("orders").add({
        email,
        cartItems,
        amount: session.amount_total / 100,
        currency: session.currency,
        createdAt: new Date(),
      });
      console.log("✅ Order saved to Firestore");
    } catch (err) {
      console.error("❌ Failed to save order to Firestore:", err);
    }
  }

  return NextResponse.json({ received: true });
}
