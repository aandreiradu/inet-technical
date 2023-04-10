import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(4, { message: 'Password must contain at least 6 characters' }),
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Incorrect email format' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
