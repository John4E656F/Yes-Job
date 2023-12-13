// app/api/stripe/webhook.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
const webhookSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
// Middleware to disable body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    const body = await req.text();
    if (!sig || !webhookSecret) {
      throw new Error('Missing Stripe Signature');
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  try {
    // console.log(event);

    switch (event.type) {
      case 'customer.created':
        // console.log(event.data.object.email);

        break;
      case 'product.created':
        // Handle product created event
        break;
      case 'product.updated':
        // Handle product updated event
        break;
      case 'payment_intent.succeeded':
        console.log('PaymentIntent was successful!');
        break;
      default:
        throw new Error('Unhandled relevant event!');
    }
  } catch (error: any) {
    console.error(`Error in processing webhook: ${error.message}`);
    return new NextResponse('Webhook handler failed. View logs.', {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function GET() {
  return new Response('HI');
}
