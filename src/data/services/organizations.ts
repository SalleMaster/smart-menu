import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Organization } from '@/generated/prisma'

export type GetOrganizationsReturnType = Promise<Organization[]>

export const getOrganizations = cache(async (): GetOrganizationsReturnType => {
  console.log('getOrganizations')

  return prisma.organization.findMany({
    orderBy: { createdAt: 'desc' },
  })
})
