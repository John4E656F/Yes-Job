import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  message: z.string().min(1),
});
