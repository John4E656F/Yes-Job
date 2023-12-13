'use server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

interface paymentProps {
  priceId: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function payment({ priceId }: paymentProps) {
  const supabase = createClient();

  //   const session = await stripe.checkout.sessions.create({
  //     success_url: 'https://example.com/success',
  //     line_items: [
  //       {
  //         price: 'price_1MotwRLkdIwHu7ixYcPLm5upriceId',
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //   });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    customer_creation: 'always',
    after_completion: {
      type: 'redirect',
      redirect: {
        url: 'http://localhost:3000',
      },
    },
  });
  console.log(paymentLink.url + `?client_reference_id=${'test'}?prefilled_email=${'test@test.com'}`);
  const paymentUrl = paymentLink.url + `?prefilled_email=test@test.com&?client_reference_id=${'test'}`;
  return paymentUrl;
}
