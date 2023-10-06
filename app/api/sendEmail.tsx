// pages/api/submitForm.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmailToRecruiter } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, cvFile, phoneNumber, email } = req.body;

      // Read the CV file and create a buffer
      const cvFileBuffer = Buffer.from(cvFile.data);

      // Construct email message and send it
      const emailMessage = `
        Name: ${name}
        Phone Number: ${phoneNumber}
        Email: ${email}
      `;

      // Attach CV file
      const attachments = [{ filename: 'cv.pdf', content: cvFileBuffer }];

      // Send email to recruiter
      await sendEmailToRecruiter(emailMessage, attachments);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
