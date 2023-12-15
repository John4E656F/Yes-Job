'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import Stripe from 'stripe';
import { fetchCompanyAndUser } from '@/lib/actions';
import { buyJoblisting, subscribe, subscribeRebill, createInvoice, addInvoiceIdToCompany } from '@/utils';

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
        const customer_id = event.data.object.customer;
        const invoice_id = event.data.object.invoice;
        const invoice = await stripe.invoices.retrieve(invoice_id as string);

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
              if (typeof customer_id === 'string') {
                buyJoblisting({ userData, companyData, amount: 1, customer_id: customer_id });
                const oneJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Basic plan 1 job post',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (oneJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: oneJobPostInvoice.invoiceId });
                }
              }
              break;
            case 'Basic plan 5 job posts':
              if (typeof customer_id === 'string') {
                buyJoblisting({ userData, companyData, amount: 5, customer_id: customer_id });
                const fiveJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Basic plan 5 job post',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (fiveJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: fiveJobPostInvoice.invoiceId });
                }
              }
              break;
            case 'Basic plan 10 job posts':
              if (typeof customer_id === 'string') {
                buyJoblisting({ userData, companyData, amount: 10, customer_id: customer_id });
                const tenJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Basic plan 10 job post',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (tenJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: tenJobPostInvoice.invoiceId });
                }
              }
              break;
            case 'Standard plan':
              if (companyData.subscription === 'Standard plan') {
                subscribeRebill({ userData, companyData, amount: 5, plan: 'Standard plan' });
                const standardRebillJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Standard plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (standardRebillJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: standardRebillJobPostInvoice.invoiceId });
                }
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 5, plan: 'Standard plan' });
                const standardJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Standard plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (standardJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: standardJobPostInvoice.invoiceId });
                }
              }
              break;
            case 'Premium plan':
              if (companyData.subscription === 'Premium plan') {
                subscribeRebill({ userData, companyData, amount: 10, boostAmount: 2, plan: 'Premium plan' });
                const premiumRebillJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Premium plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (premiumRebillJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: premiumRebillJobPostInvoice.invoiceId });
                }
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 10, boostAmount: 2, plan: 'Premium plan' });
                const premiumJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Premium plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (premiumJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: premiumJobPostInvoice.invoiceId });
                }
              }
              break;
            case 'Platinum plan':
              if (companyData.subscription === 'Platinum plan') {
                subscribeRebill({ userData, companyData, amount: 15, boostAmount: 5, plan: 'Platinum plan' });
                const platinumRebillJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Premium plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (platinumRebillJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: platinumRebillJobPostInvoice.invoiceId });
                }
              } else if (companyData.subscription === null) {
                subscribe({ userData, companyData, amount: 15, boostAmount: 5, plan: 'Platinum plan' });
                const platinumJobPostInvoice = await createInvoice({
                  companyData: companyData,
                  name: 'Premium plan',
                  invoice_url: invoice.hosted_invoice_url!,
                  invoice_pdf: invoice.invoice_pdf!,
                });

                if (platinumJobPostInvoice) {
                  addInvoiceIdToCompany({ companyData: companyData, invoice_id: platinumJobPostInvoice.invoiceId });
                }
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
          }
        }
        break;
      case 'customer.subscription.updated':
        const price_id = event.data.object.items.data[0].plan.id;
        // console.log('PRICE ID: ' + price_id);
        // const { fetchedCompanyData, fetchedUserById } = await fetchCompanyAndUser({ userId: session.client_reference_id });
        // if (fetchedCompanyData && fetchedUserById) {
        //   companyData = fetchedCompanyData;
        //   userData = fetchedUserById;
        // }
        switch (price_id) {
          case 'price_1OMWpzElNHG3WsnfdWTcv2Pk':
            console.log('Standard plan');

            break;
          case 'price_1OMWqOElNHG3WsnfyydUmdZZ':
            console.log('Premium plan');
            break;
          case 'price_1OMWqmElNHG3WsnfX1r2vPjI':
            console.log('Platinum plan');
            break;
        }

        // const price = await stripe.prices.retrieve(price_id);
        // console.log('PRICE: ', price);

        // const sub_id = event.data.object.id;

        // const subscription = await stripe.subscriptions.retrieve(sub_id);
        // console.log(subscription);

        // console.log(invoice_id);
        // console.log(companyData);

        // updateInvoice({
        //   companyData: companyData!,
        //   invoice_url: event.data.object.hosted_invoice_url!,
        //   invoice_pdf: event.data.object.invoice_pdf!,
        //   invoice_id: invoice_id!,
        // });
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
