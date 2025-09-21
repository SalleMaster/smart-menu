import { z } from 'zod'

const addOrganizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters long'),
})

type AddOrganizationSchemaValues = z.infer<typeof addOrganizationSchema>

export { addOrganizationSchema, type AddOrganizationSchemaValues }
