import { z } from 'zod'

const signUpEmailSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
})

type SignUpEmailSchemaValues = z.infer<typeof signUpEmailSchema>

export { signUpEmailSchema, type SignUpEmailSchemaValues }
