import { z } from 'zod';

export const signupFormSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .refine((value) => /[!@#$%^&*() _+=[\]{ }; ':"\\|,.<>?]+/.test(value), {
      message: 'Password must contain at least one special character',
      path: ['password'],
    })
    .refine((value) => /\d.*\d/.test(value), {
      message: 'Password must contain at least two numbers',
      path: ['password'],
    }),
  isCompany: z.string({ required_error: 'Please select an option' }),
});
