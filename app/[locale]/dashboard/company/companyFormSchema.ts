import { z } from 'zod';

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
  slug: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase().replace(/\s/g, '')),
  website: z.string().url().optional().or(z.literal('')),
  logo: z.union([z.string(), z.any()]).nullable(),
  about: z.string().max(275).optional(),
  address: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase()),
});
