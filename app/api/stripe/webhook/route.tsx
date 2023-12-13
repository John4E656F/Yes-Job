// app/api/stripe/webhook.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
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
  const supabase = createClient();
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
    let userData;
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const { data: fetchedUserByEmail, error: fetchedUserByEmailError } = await supabase
          .from('users')
          .select(`*`)
          .eq('user_email', event.data.object.customer_details?.email)
          .single();
        if (fetchedUserByEmailError) {
          const { data: fetchedUserById, error: fetchedUserByIdError } = await supabase
            .from('users')
            .select(`*`)
            .eq('id', event.data.object.client_reference_id)
            .single();
          if (fetchedUserById) {
            userData = fetchedUserById;
          }
        } else {
          userData = fetchedUserByEmail;
        }
        const { line_items } = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items'],
        });

        if (line_items) {
          const { description } = line_items.data[0];
          console.log(description);
        }
        console.log(line_items);

        console.log(event.data.object.customer_details?.email);
        console.log(event.data.object.client_reference_id);

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
