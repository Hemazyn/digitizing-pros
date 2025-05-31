import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
     apiVersion: '2024-04-10',
});

export async function POST(req) {
     try {
          const { amount, currency } = await req.json();

          if (isNaN(amount) || amount <= 0) {
               return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
          }

          const paymentIntent = await stripe.paymentIntents.create({
               amount: Math.round(amount * 100),
               currency: currency || 'usd',
               automatic_payment_methods: {
                    enabled: true,
               },
          });

          return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });

     } catch (error) {
          console.error('Error creating PaymentIntent:', error);
          return NextResponse.json({ error: error.message }, { status: 500 });
     }
}