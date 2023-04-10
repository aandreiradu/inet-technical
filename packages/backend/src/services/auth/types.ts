import { z } from 'zod';

/* Register Schema */
export const registerUserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Incorrect email format' }),
});

/* LogIn Schema */
export const loginUserSchema = z.object({
  username: z.string().min(1, { message: 'Username field is required' }),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
});

export type LoginSchema = z.infer<typeof loginUserSchema>;
export type RegisterUserArgs = z.infer<typeof registerUserSchema>;
export type LogInUserArgs = z.infer<typeof loginUserSchema>;

/* Return types for auth controllers / services */

export type TAuthUserReturn = {
  accessToken: string;
  refreshToken: string;
  username: string;
  fullName: string;
  email: string;
};
