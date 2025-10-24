import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Prisma } from '@/generated/prisma'

export const getProducts = cache(async (args: Prisma.ProductFindManyArgs) => {
  return prisma.product.findMany(args)
})

export const getProduct = cache(async (args: Prisma.ProductFindUniqueArgs) => {
  return prisma.product.findUnique(args)
})

export type ProductWithCategories = Prisma.ProductGetPayload<{
  include: { categories: true }
}>
