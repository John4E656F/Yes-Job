// app/api/stripe/webhook.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
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
  const session = await getServerUserSession();
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
    let companyData;
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const { data: fetchedCompanyData, error: fetchedCompanyDataError } = await supabase
          .from('company')
          .select(`*`)
          .eq('owner_id', event.data.object.client_reference_id)
          .single();
        if (fetchedCompanyData) {
          companyData = fetchedCompanyData;
        } else {
          console.log('Error fetching company data:', fetchedCompanyDataError);
        }

        const { data: fetchedUserById, error: fetchedUserByIdError } = await supabase
          .from('users')
          .select(`*`)
          .eq('id', event.data.object.client_reference_id)
          .single();
        if (fetchedUserById) {
          userData = fetchedUserById;
        }

        const { line_items } = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items'],
        });

        if (line_items) {
          const { description } = line_items.data[0];
          console.log('Updating user with ID:', userData.id);
          console.log('Company Data', companyData);
          console.log('Current availableJobListing:', companyData.availableJobListing);

          switch (description) {
            case 'Basic plan 1 job post':
              const { data, error: addOnePostError } = await supabase
                .from('company')
                .update({ availableJobListing: companyData.availableJobListing + 1 })
                .eq('owner_id', userData.id);

              if (addOnePostError) {
                console.log('Error adding one post:', addOnePostError.message);
              }
              break;
            case 'Basic plan 5 job posts':
              const { error: addFivePostError } = await supabase
                .from('company')
                .update({ availableJobListing: companyData.availableJobListing + 5 })
                .eq('owner_id', userData.id);

              if (addFivePostError) {
                console.log('Error adding one post:', addFivePostError.message);
              }
              break;
            case 'Basic plan 10 job posts':
              const { error: addTenPostError } = await supabase
                .from('company')
                .update({ availableJobListing: companyData.availableJobListing + 10 })
                .eq('owner_id', userData.id);

              if (addTenPostError) {
                console.log('Error adding one post:', addTenPostError.message);
              }
              break;
          }
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
