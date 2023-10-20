import { z } from 'zod';

export const publishFormSchema = z.object({
  id: z.number().optional(),
  user_Id: z.string().optional(),
  companyId: z
    .object({
      user_name: z.string(),
      user_email: z.string().email(),
      user_logo: z.string(),
      isCompany: z.boolean().optional(),
    })
    .optional(),
  companyName: z.string(),
  logo: z.union([z.string(), z.any()]).nullable(),
  title: z.string(),
  jobFunction: z.string(),
  cdd: z.boolean(),
  cdi: z.boolean(),
  fullTime: z.boolean(),
  partTime: z.boolean(),
  experience: z.boolean(),
  description: z.string(),
  location: z.string(),
  salaryMin: z.number().nullable(),
  salaryMax: z.number().nullable(),
  applicationMethod: z.enum(['yesJob', 'externalForm', 'both']),
  externalFormURL: z.string().url(),
  contactName: z.string().toLowerCase(),
  contactEmail: z.string().trim().toLowerCase().email('Invalid email address'),
  created_at: z.string().optional(),
  requestCount: z.number().optional(),
  pageViewCount: z.number().optional(),
  cvFile: z.instanceof(File),
  pinned: z.boolean().optional(),
  promoted: z.boolean().optional(),
  pinned_at: z.string().nullable().optional(),
  promoted_at: z.string().nullable().optional(),
});
