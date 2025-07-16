import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { cartItems, email, selectedPaymentMethod } = body;

  if (!cartItems || !Array.isArray(cartItems)) {
    return new Response(JSON.stringify({ error: "cartItems is not defined" }), { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round((item.price + 0.07) * 100),
      },
      quantity: item.quantity || 1,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/cart?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/cart?canceled=true`,
  });

  return new Response(JSON.stringify({ id: session.id }), { status: 200 });
}
