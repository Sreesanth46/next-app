import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
});

export const registerUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8, 'Password should be at least 8 characters')
});

export const loginSchema = z.object({
  email: z.string().min(3).max(255),
  password: z.string().min(8, 'Password should be at least 8 characters')
});
