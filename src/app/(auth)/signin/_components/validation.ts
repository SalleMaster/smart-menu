import { z } from 'zod'

const signInWithEmailSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
})

type SignInWithEmailSchemaValues = z.infer<typeof signInWithEmailSchema>

export { signInWithEmailSchema, type SignInWithEmailSchemaValues }
