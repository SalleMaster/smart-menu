import getSession from '@/lib/getSession'
import { USER_ROLES } from '@/lib/types'

export const adminActionGuard = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== USER_ROLES.ADMIN) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
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
