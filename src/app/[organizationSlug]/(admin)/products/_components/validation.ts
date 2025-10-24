import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Naziv je neophodan')
    .max(100, 'Naziv ne može biti duži od 100 karaktera'),
  description: z
    .string()
    .trim()
    .max(500, 'Opis ne može biti duži od 500 karaktera')
    .optional(),
  price: z.coerce
    .number<number>('Cena mora biti broj')
    .min(0, 'Cena ne može biti negativna'),
  categories: z
    .array(z.string())
    .min(1, 'Molimo izaberite bar jednu kategoriju'),
  organizationId: z.string(),
})

export type ProductValues = z.infer<typeof productSchema>
