import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Invitation, Organization, Prisma, User } from '@/generated/prisma'

export type GetOrganizationsReturnType = Promise<Organization[]>

export const getOrganizations = cache(
  async (args: Prisma.OrganizationFindManyArgs): GetOrganizationsReturnType => {
    return prisma.organization.findMany(args)
  }
)

export type GetOrganizationReturnType = Promise<Organization | null>

export type OrganizationWithRelations = Organization & {
  users: User[]
  invitations: Invitation[]
}

export const getOrganization = cache(
  async (
    args: Prisma.OrganizationFindUniqueArgs
  ): GetOrganizationReturnType => {
    return prisma.organization.findUnique(args)
  }
)
