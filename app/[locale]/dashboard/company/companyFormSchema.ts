import { z } from 'zod';

export const companyFormSchema = z.object({
  owner_id: z.string(),
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase().replace(/\s/g, ''))
    .optional(),
  website: z
    .string()
    .optional()
    .transform((val) => (val ? (val.startsWith('http://') || val.startsWith('https://') ? val : `https://${val}`) : ''))
    .refine((val) => val === '' || z.string().url().parse(val), 'Invalid url'),
  logo: z.union([z.string(), z.any()]).nullable(),
  about: z.string().max(275).optional(),
  address: z
    .string()
    .min(1)
    .transform((val) => val.toLowerCase())
    .optional(),
});
