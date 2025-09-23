import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Invitation, Prisma } from '@/generated/prisma'

export type GetInvitationsReturnType = Promise<Invitation[]>

export const getInvitations = cache(
  async (args: Prisma.InvitationFindManyArgs): GetInvitationsReturnType => {
    return prisma.invitation.findMany(args)
  }
)

export type GetInvitationReturnType = Promise<Invitation | null>

export const getInvitation = cache(
  async (args: Prisma.InvitationFindUniqueArgs): GetInvitationReturnType => {
    return prisma.invitation.findUnique(args)
  }
)
