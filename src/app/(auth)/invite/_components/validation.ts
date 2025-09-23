import { z } from 'zod'

const inviteSignUpEmailSchema = z
  .object({
    token: z.string(),
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type InviteSignUpEmailSchemaValues = z.infer<typeof inviteSignUpEmailSchema>

export { inviteSignUpEmailSchema, type InviteSignUpEmailSchemaValues }
