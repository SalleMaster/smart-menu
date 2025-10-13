import getSession from '@/lib/getSession'
import { USER_ROLES } from '@/lib/types'
import prisma from './db'

export const adminActionGuard = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role
  const userName = session?.user?.name
  const userEmail = session?.user?.email

  if (!userId || userRole !== USER_ROLES.ADMIN) {
    throw Error('Unauthorized')
  }

  return { userId, userRole, userName, userEmail }
}

export const ownerActionGuard = async ({
  organizationSlug,
}: {
  organizationSlug: string
}) => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role
  const userName = session?.user?.name
  const userEmail = session?.user?.email

  if (!userId) {
    throw Error('Unauthorized')
  }

  if (userRole === USER_ROLES.ADMIN) {
    return { userId, userRole, userName, userEmail }
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: organizationSlug },
    select: { users: { where: { id: userId }, select: { id: true } } },
  })

  if (!organization) throw Error('Organization not found')
  if (!organization.users.length) throw Error('Unauthorized')

  return { userId, userRole, userName, userEmail }
}

export const loggedInActionGuard = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
}

export const loggedInUser = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  return { userId, userRole }
}
