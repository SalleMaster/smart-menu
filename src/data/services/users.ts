import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { User, Prisma } from '@/generated/prisma'

export type GetUsersReturnType = Promise<User[]>

export const getUsers = cache(
  async (args: Prisma.UserFindManyArgs): GetUsersReturnType => {
    return prisma.user.findMany(args)
  }
)

export type GetUserReturnType = Promise<User | null>

export const getUser = cache(
  async (args: Prisma.UserFindUniqueArgs): GetUserReturnType => {
    return prisma.user.findUnique(args)
  }
)
