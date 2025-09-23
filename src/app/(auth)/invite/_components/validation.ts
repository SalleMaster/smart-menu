import { z } from 'zod'
import { signUpEmailSchema } from '../../signup/_components/validation'

const inviteSignUpEmailSchema = signUpEmailSchema.safeExtend({
  token: z.string(),
})

type InviteSignUpEmailSchemaValues = z.infer<typeof inviteSignUpEmailSchema>

export { inviteSignUpEmailSchema, type InviteSignUpEmailSchemaValues }
