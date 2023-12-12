import Stripe from 'stripe';
import { headers } from 'next/headers';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true, apiVersion: '2023-10-16' });

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get('stripe-signature') as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }
  console.log('event', event);
}
