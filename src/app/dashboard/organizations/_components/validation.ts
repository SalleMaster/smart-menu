import { z } from 'zod'

const editOrganizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters long'),
})

type EditOrganizationValues = z.infer<typeof editOrganizationSchema>

export { editOrganizationSchema, type EditOrganizationValues }
