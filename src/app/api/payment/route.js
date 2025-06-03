import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartItems } = body;
    const taxRate = 0.07;

    const line_items = cartItems.map((item) => {
      const priceInCents = Math.round(parseFloat(item.metadata?.price || "2.99") * 100);
      const silkChargeInCents = item.options?.selectedThreadType === "Silk (+$5.00)" ? 500 : 0;
      const basePriceInCents = priceInCents + silkChargeInCents;
      const taxInCents = Math.round(basePriceInCents * taxRate);
      const finalPriceInCents = basePriceInCents + taxInCents;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.original_filename || "Untitled Product",
            images: [item.secure_url],
          },
          unit_amount: finalPriceInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/store/cart?success=true`,
      cancel_url: `${req.headers.get("origin")}/store/cart?canceled=true`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return new Response(JSON.stringify({ statusCode: 500, message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
