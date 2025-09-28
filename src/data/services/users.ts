import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Organization, Prisma, User } from '@/generated/prisma'

export const getUsers = cache(async (args: Prisma.UserFindManyArgs) => {
  return prisma.user.findMany(args)
})

export const getUser = cache(async (args: Prisma.UserFindUniqueArgs) => {
  return prisma.user.findUnique(args)
})

// Types
export type UserWithRelations = User & {
  organization: Organization | null
}
