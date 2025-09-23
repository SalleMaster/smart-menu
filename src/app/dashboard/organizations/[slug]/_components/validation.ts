import { z } from 'zod'

const inviteUserSchema = z.object({
  email: z.email('Invalid email address'),
  organizationId: z.uuid(),
})

type InviteUserValues = z.infer<typeof inviteUserSchema>

export { inviteUserSchema, type InviteUserValues }
