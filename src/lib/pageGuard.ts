import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { USER_ROLES } from '@/lib/types'

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
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`)
  }

  const userId = user.id
  const userRole = user.role
  const userName = user.name
  const userEmail = user.email
  // const userPhone = user.phone

  if (!userId || (adminGuard && userRole !== USER_ROLES.ADMIN)) {
    redirect('/')
  }

  return { userId, userRole, userName, userEmail }
}

export default pageGuard
