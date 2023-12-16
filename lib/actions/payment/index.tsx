'use server';
import Stripe from 'stripe';
import { CompanyTypes, UsersTypes } from '@/types';

interface paymentProps {
  priceId: string;
  userData: UsersTypes;
  companyData: CompanyTypes;
  paymentType: 'payment' | 'subscription';
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
console.log(process.env.STRIPE_SECRET_KEY!);

export async function payment({ priceId, userData, companyData, paymentType }: paymentProps) {
  // const paymentLink = await stripe.paymentLinks.retrieve(pLink);
  let session;
  if (companyData.stripe_customer_id) {
    if (paymentType === 'subscription') {
      session = await stripe.checkout.sessions.create({
        customer: companyData.stripe_customer_id,
        // customer_email: userData.user_email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        // return_url: 'http://localhost:3000/pricing',
        success_url: 'http://localhost:3000',
        automatic_tax: { enabled: true },
        billing_address_collection: 'required',
        // customer_creation: 'always',
        customer_update: {
          address: 'auto',
          name: 'auto',
        },
        allow_promotion_codes: true,
        // discounts: [{ promotion_code: 'true' }],
        locale: 'auto',
        tax_id_collection: { enabled: true },
        client_reference_id: userData.id,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        customer: companyData.stripe_customer_id,
        // customer_email: userData.user_email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        // return_url: 'http://localhost:3000/pricing',
        success_url: 'http://localhost:3000',
        automatic_tax: { enabled: true },
        billing_address_collection: 'required',
        // Error: You cannot collect consent to your terms of service unless a URL is set in the Stripe Dashboard.
        // Update your public business details in the
        // Dashboard https://dashboard.stripe.com/settings/public with a
        // Terms of service URL to collect terms of service consent.
        // consent_collection: { terms_of_service: 'required' },
        customer_update: {
          address: 'auto',
          name: 'auto',
        },
        allow_promotion_codes: true,
        // discounts: [{ promotion_code: 'true' }],
        invoice_creation: { enabled: true },
        locale: 'auto',
        tax_id_collection: { enabled: true },
        client_reference_id: userData.id,
      });
    }
  } else {
    if (paymentType === 'subscription') {
      session = await stripe.checkout.sessions.create({
        customer_email: userData.user_email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        // return_url: 'http://localhost:3000/pricing',
        success_url: 'http://localhost:3000',
        automatic_tax: { enabled: true },
        billing_address_collection: 'required',
        allow_promotion_codes: true,
        // discounts: [{ promotion_code: 'true' }],
        locale: 'auto',
        tax_id_collection: { enabled: true },
        client_reference_id: userData.id,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        customer_email: userData.user_email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        // return_url: 'http://localhost:3000/pricing',
        success_url: 'http://localhost:3000',
        automatic_tax: { enabled: true },
        billing_address_collection: 'required',
        // consent_collection: { terms_of_service: 'required' },
        customer_creation: 'always',
        allow_promotion_codes: true,
        // discounts: [{ promotion_code: 'true' }],
        invoice_creation: { enabled: true },
        locale: 'auto',
        tax_id_collection: { enabled: true },
        client_reference_id: userData.id,
      });
    }
  }

  // console.log('session', session);

  const paymentLink = session.url;
  // console.log('paymentLink', paymentLink);

  return paymentLink;
}

// const paymentLink = await stripe.paymentLinks.update(pLink, {
//   metadata: {
//     order_id: '6735',
//   },
//   customer_creation: 'if_required',
// });
// const paymentUrl = paymentLink + `?client_reference_id=${userData.id}`;
// console.log('paymentUrl', paymentUrl);

// if (paymentType === 'subscription') {
// paymentLink = await stripe.paymentLinks.create({
//   line_items: [
//     {
//       price: priceId,
//       quantity: 1,
//     },
//   ],
//   automatic_tax: { enabled: true },
//   tax_id_collection: { enabled: true },
//   after_completion: {
//     type: 'redirect',
//     redirect: {
//       url: 'http://localhost:3000',
//     },
//   },
// });
// } else {
//   paymentLink = await stripe.paymentLinks.create({
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       },
//     ],
//     automatic_tax: { enabled: true },
//     tax_id_collection: { enabled: true },
//     customer_creation: 'if_required',
//     invoice_creation: { enabled: true },
//     after_completion: {
//       type: 'redirect',
//       redirect: {
//         url: 'http://localhost:3000',
//       },
//     },
//   });
// }
// console.log(paymentLink.url + `?client_reference_id=${userData.id}?prefilled_email=${userData.user_email}`);
