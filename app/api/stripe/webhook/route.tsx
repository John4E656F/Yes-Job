'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import Stripe from 'stripe';
import { fetchCompanyAndUser } from '@/lib/actions';
import { buyJoblisting, subscribe, subscribeRebill } from '@/utils';

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
    console.log(event);
    let userData;
    let companyData;
    switch (event.type) {
      case 'payment_link.created':
        break;
      case 'checkout.session.completed':
        const session = event.data.object;
        if (session.client_reference_id) {
          const { fetchedCompanyData, fetchedUserById } = await fetchCompanyAndUser({ userId: session.client_reference_id });
          if (fetchedCompanyData && fetchedUserById) {
            companyData = fetchedCompanyData;
            userData = fetchedUserById;
          }
        }

        const { line_items } = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items'],
        });

        if (line_items && userData && companyData) {
          const { description } = line_items.data[0];
          // console.log('Updating user with ID:', userData.id);
          // console.log('Company Data', companyData);
          // console.log('Current availableJobListing:', companyData.availableJobListing);

          switch (description) {
            case 'Basic plan 1 job post':
              buyJoblisting({ userData, companyData, amount: 1 });
              console.log(event.data.object.invoice);
              console.log(event.data.object.invoice_creation);

              break;
            case 'Basic plan 5 job posts':
              buyJoblisting({ userData, companyData, amount: 5 });
              break;
            case 'Basic plan 10 job posts':
              buyJoblisting({ userData, companyData, amount: 10 });
              break;
            case 'Standard plan':
              if (companyData.subscription === 'Standard plan') {
                subscribeRebill({ userData, companyData, amount: 5, plan: 'Standard plan' });
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 5, plan: 'Standard plan' });
              }
              break;
            case 'Premium plan':
              if (companyData.subscription === 'Premium plan') {
                subscribeRebill({ userData, companyData, amount: 10, boostAmount: 2, plan: 'Premium plan' });
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 10, boostAmount: 2, plan: 'Premium plan' });
              }
              break;
            case 'Platinum plan':
              if (companyData.subscription === 'Platinum plan') {
                subscribeRebill({ userData, companyData, amount: 15, boostAmount: 5, plan: 'Platinum plan' });
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 15, boostAmount: 5, plan: 'Platinum plan' });
              }
              break;
            case 'Boost 1':
              const { error: addOneBoostError } = await supabase
                .from('company')
                .update({ availableBoost: companyData.availableBoost! + 1 })
                .eq('owner_id', userData.id);

              if (addOneBoostError) {
                console.log('Error adding one post:', addOneBoostError.message);
              }
              break;
            case 'Boost 5':
              const { error: addFiveBoostError } = await supabase
                .from('company')
                .update({ availableBoost: companyData.availableBoost! + 5 })
                .eq('owner_id', userData.id);

              if (addFiveBoostError) {
                console.log('Error adding one post:', addFiveBoostError.message);
              }
              break;
            // case 'Company Boost':
            //   const { error: addCompanyBoostError } = await supabase
            //   .from('company')
            //   .update({ companyBoost: true })
            //   .eq('owner_id', userData.id);

            // if (addCompanyBoostError) {
            //   console.log('Error adding one post:', addCompanyBoostError.message);
            // }
            // break;
          }
        }
        // console.log(line_items);

        // console.log(event.data.object.customer_details?.email);
        // console.log(event.data.object.client_reference_id);

        // Handle product created event
        break;
      // case 'product.updated':
      //   // Handle product updated event
      //   break;
      // case 'payment_intent.succeeded':
      //   console.log('PaymentIntent was successful!');
      //   break;
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
