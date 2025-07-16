import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { paymentMethodId } = await req.json();

  if (!paymentMethodId) {
    return NextResponse.json({ error: "Missing paymentMethodId" }, { status: 400 });
  }

  try {
    await stripe.paymentMethods.detach(paymentMethodId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Detach error:", err);
    return NextResponse.json({ error: "Failed to remove payment method" }, { status: 500 });
  }
}
