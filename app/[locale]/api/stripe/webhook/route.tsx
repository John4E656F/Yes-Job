import Stripe from 'stripe';
import { headers } from 'next/headers';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true, apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'product.created':
        break;
      case 'product.updated':
        break;
      default:
        throw new Error('Unhandled relevant event!');
    }
  } catch (error) {
    console.log(error);
    return new Response('Webhook handler failed. View logs.', {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ received: true }));
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
