import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.payment_method"],
    });

    const paymentIntent = session.payment_intent;
    const paymentMethod = paymentIntent?.payment_method;

    const cardDetails = paymentMethod?.card;

    return new Response(
      JSON.stringify({
        id: session.id,
        amount_total: session.amount_total,
        payment_method_details: {
          card: {
            last4: cardDetails?.last4,
            brand: cardDetails?.brand,
            exp_month: cardDetails?.exp_month,
            exp_year: cardDetails?.exp_year,
          },
        },
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Stripe session fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch session" }), {
      status: 500,
    });
  }
}
