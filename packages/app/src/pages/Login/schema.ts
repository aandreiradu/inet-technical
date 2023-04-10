import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username field is required' }),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
