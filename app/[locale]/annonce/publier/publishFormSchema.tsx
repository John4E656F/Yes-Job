import { z } from 'zod';

export const publishFormSchema = z.object({
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
  description: z.string().min(1),
  location: z.string().min(1),
  salaryMin: z.number().nullable(),
  salaryMax: z.number().nullable(),
  applicationMethod: z.enum(['yesJob', 'externalForm', 'both']),
  externalFormURL: z.string().url(),
  contactName: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
  contactEmail: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  pinned: z.boolean().optional(),
  pinned_at: z.date().nullable().optional(),
});
