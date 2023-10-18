import nodemailer from 'nodemailer';

export async function sendEmail(sender: string, recipient: string, subject: string, message: string, attachments: any[]) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PRIVATE_GMAIL_EMAIL,
      pass: process.env.NEXT_PRIVATE_GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    text: message,
    attachments: attachments.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
    })),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
