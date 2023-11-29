import { z } from 'zod';

export const publishFormSchema = z.object({
  id: z.number().optional(),
  user_Id: z.string().optional(),
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
});
