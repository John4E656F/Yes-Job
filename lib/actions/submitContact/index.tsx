'use server';
import { type contactFormInputs } from '@/app/[locale]/(home)/contact/contactFormResolver';

export async function submitContactForm(data: contactFormInputs) {
  try {
    const response = await fetch('https://submit-form.com/PSmSObp9', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        message: data.message,
      }),
    });

    if (response.ok) {
      return Response.json({ type: 'success' });
    } else {
      return Response.json({ type: 'error' });
    }
  } catch (error: any) {
    return Response.json(error.message);
  }
}
