import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Organization, Prisma } from '@/generated/prisma'

export type GetOrganizationsReturnType = Promise<Organization[]>

export const getOrganizations = cache(async (): GetOrganizationsReturnType => {
  console.log('getOrganizations')

  return prisma.organization.findMany({
    orderBy: { createdAt: 'desc' },
  })
})

export type GetOrganizationReturnType = Promise<Organization | null>

export const getOrganization = cache(
  async (
    args: Prisma.OrganizationFindUniqueArgs
  ): GetOrganizationReturnType => {
    return prisma.organization.findUnique(args)
  }
)
