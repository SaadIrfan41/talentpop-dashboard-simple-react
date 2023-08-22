import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().nonempty('Generate a Password'),
  // .max(30, 'Password must contain at most 30 character(s)'),
  job_title: z.string().trim().nonempty('Job Title is required'),
  role: z.enum([
    'Team Lead',
    'Customer Success Manager',
    'Customer Success Manager II',
    'Super Admin',
    'Admin',
  ]),
})

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(7, 'Password must contain at least 7 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),
})
