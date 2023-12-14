'use server';
import Stripe from 'stripe';
import { UsersTypes } from '@/types';

interface paymentProps {
  priceId: string;
  userData: UsersTypes;
  paymentType: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function payment({ priceId, userData, paymentType }: paymentProps) {
  let paymentLink;
  if (paymentType === 'subscription') {
    paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: 'http://localhost:3000',
        },
      },
    });
  } else {
    paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      customer_creation: 'if_required',
      invoice_creation: { enabled: true },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: 'http://localhost:3000',
        },
      },
    });
  }
  // console.log(paymentLink.url + `?client_reference_id=${userData.id}?prefilled_email=${userData.user_email}`);
  const paymentUrl = paymentLink.url + `?client_reference_id=${userData.id}&prefilled_email=${userData.user_email}`;
  return paymentUrl;
}
