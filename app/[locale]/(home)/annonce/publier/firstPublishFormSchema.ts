import { z } from 'zod';

export const firstPublishFormSchema = z.object({
  id: z.number().optional(),
  user_Id: z.string().optional(),
  companyName: z.string().min(1),
  logo: z.union([z.string(), z.any()]).nullable(),
  title: z.string().min(1),
  jobFunction: z.string().min(1),
  cdd: z.boolean(),
  cdi: z.boolean(),
  fullTime: z.boolean(),
  partTime: z.boolean(),
  experience: z.string().min(1),
  english: z.boolean(),
  french: z.boolean(),
  dutch: z.boolean(),
  description: z.string().min(1),
  location: z.string().min(1),
  salaryMin: z.number().nullable(),
  salaryMax: z.number().nullable(),
  applicationMethod: z.enum(['yesJob', 'externalForm', 'both']),
  externalFormURL: z.string().url().optional(),
  companyWebsite: z.string().url().optional(),
  companyPhone: z.number().nullable(),
  contactName: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
  contactEmail: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  contactPassword: z
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
});
