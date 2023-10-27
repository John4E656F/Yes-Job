import { z } from 'zod';

export const submitCVFormSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
  cvFile: z.instanceof(File).refine((file) => file.size > 0, { message: 'CV file is required' }),
  phoneNumber: z.string().refine((value) => /^(\+32|0)[1-9]\d{8}$/.test(value), { message: 'Invalid Belgian phone number' }),
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
});
