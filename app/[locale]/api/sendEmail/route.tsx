import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/services';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const email = formData.get('email') as string;
    const recruiterEmail = formData.get('recruiterEmail') as string;

    const cvFile = formData.get('cvFile') as any;

    let cvFileBuffer;
    if (cvFile) {
      const chunks = [];
      for await (const chunk of cvFile.stream()) {
        chunks.push(chunk);
      }
      cvFileBuffer = Buffer.concat(chunks);
    }

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
