import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.NEXT_PRIVATE_SENDGRID_API_KEY as string);

export async function sendEmailToRecruiter(message: string, attachments: any[]) {
  const msg = {
    to: 'recruiter@example.com', // Use jobPost.contactEmail here
    from: 'your-app@example.com',
    subject: 'New Job Application',
    text: message,
    attachments,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
