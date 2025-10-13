import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Prisma } from '@/generated/prisma'

export const getCategories = cache(
  async (args: Prisma.CategoryFindManyArgs) => {
    return prisma.category.findMany(args)
  }
)

export const getCategory = cache(
  async (args: Prisma.CategoryFindUniqueArgs) => {
    return prisma.category.findUnique(args)
  }
)
