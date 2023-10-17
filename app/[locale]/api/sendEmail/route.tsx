import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/services';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData(); // This line stays the same

    const name = formData.get('name') as string;
    const cvFile = formData.get('cvFile') as any; // Temporarily use `any` here
    const phoneNumber = formData.get('phoneNumber') as string;
    const email = formData.get('email') as string;
    const recruiterEmail = formData.get('recruiterEmail') as string;

    const cvFileBuffer = cvFile?.buffer; // Assume it's a file object with a buffer property

    const emailMessage = `
      Name: ${name}
      Phone Number: ${phoneNumber}
      Email: ${email}
    `;

    const attachments = [{ filename: 'cv.pdf', content: cvFileBuffer }];

    // Send email to recruiter
    await sendEmail(email, recruiterEmail, 'New Job Application', emailMessage, attachments);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' });
  }
}
