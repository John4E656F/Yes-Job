import { z } from 'zod';

export const infoFormSchema = z.object({
  user_id: z.string(),
  contactname: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  user_email: z.string().min(1),
  user_phone: z.number().nullable().optional(),
  profile_picture: z.union([z.string(), z.any()]).nullable(),
});
