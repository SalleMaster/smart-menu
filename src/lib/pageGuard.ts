import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { USER_ROLES } from '@/lib/types'
import prisma from './db'

type PageGuardParams = {
  callbackUrl: string
  adminGuard?: boolean
}

const pageGuard = async ({
  callbackUrl,
  adminGuard = false,
}: PageGuardParams) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect(`/signin?callbackUrl=${callbackUrl}`)
  }

  const userId = user.id
  const userRole = user.role
  const userName = user.name
  const userEmail = user.email

  if (!userId || (adminGuard && userRole !== USER_ROLES.ADMIN)) {
    redirect('/')
  }

  return { userId, userRole, userName, userEmail }
}

const ownerPageGuard = async ({
  callbackUrl,
  organizationSlug,
}: {
  callbackUrl: string
  organizationSlug: string
}) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect(`/signin?callbackUrl=${callbackUrl}`)
  }

  const userId = user.id
  const userRole = user.role
  const userName = user.name
  const userEmail = user.email

  if (userRole === USER_ROLES.ADMIN) {
    return { userId, userRole, userName, userEmail }
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: organizationSlug },
    select: { users: { where: { id: userId }, select: { id: true } } },
  })

  if (!organization) redirect('/') // TODO 404 page
  if (!organization.users.length) redirect('/') // TODO 404 page

  return { userId, userRole, userName, userEmail }
}

export { pageGuard, ownerPageGuard }
