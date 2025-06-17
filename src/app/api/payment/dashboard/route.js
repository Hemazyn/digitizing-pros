import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { selectedPlan, selectedSize, selectedComplexity, selectedFormat, email, instructions } = body;

    if (!selectedPlan || !selectedSize || !selectedFormat) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });
    }

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${selectedPlan} - ${selectedSize} - ${selectedFormat}`,
            description: instructions || "",
          },
          unit_amount: 299,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${req.headers.get("origin")}/dashboard/orders?success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard/orders?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
