import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartItems, selectedPaymentMethod } = body;

    const taxRate = 0.07;
    const basePrice = 2.99;
    const finalPriceWithTax = basePrice + taxRate;
    const unitAmount = Math.round(finalPriceWithTax * 100);

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.original_filename || "Untitled Product",
          images: [item.secure_url],
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity || 1,
    }));

    let payment_method_types_to_use = [];
    if (selectedPaymentMethod === "stripe") {
      payment_method_types_to_use = ["card"];
    } else if (selectedPaymentMethod === "google_pay") {
      payment_method_types_to_use = ["card"];
    } else if (selectedPaymentMethod === "apple_pay") {
      payment_method_types_to_use = ["card"];
    } else {
      payment_method_types_to_use = ["card"];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: payment_method_types_to_use,
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
    return new Response(JSON.stringify({ statusCode: 500, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
