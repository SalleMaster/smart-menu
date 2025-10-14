import { z } from 'zod'

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Naziv je neophodan')
    .max(100, 'Naziv ne može biti duži od 100 karaktera'),
  active: z.boolean(),
  featured: z.boolean(),
  organizationId: z.string(),
})

export type CategoryValues = z.infer<typeof categorySchema>
