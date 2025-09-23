import getSession from '@/lib/getSession'
import InviteSignUpForm from './_components/InviteSignUpForm'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { isBefore } from 'date-fns'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Sign Up | Invite',
}

export default async function Page(props: PageProps<'/invite'>) {
  const session = await getSession()

  await new Promise((resolve) => setTimeout(resolve, 5000))

  const searchParams = await props.searchParams
  const token = searchParams.token

  if (!token || typeof token !== 'string') {
    return <InvalidInvitation />
  }

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { organization: true },
  })

  if (session && invitation) {
    redirect(`/${invitation.organization.slug}/dashboard`)
  }

  if (
    !invitation ||
    invitation.accepted ||
    isBefore(invitation.expiresAt, new Date())
  ) {
    return <InvalidInvitation />
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <InviteSignUpForm
        token={token}
        email={invitation.email}
        organizationSlug={invitation.organization.slug}
      />
    </div>
  )
}

function InvalidInvitation() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      Invalid invitation, please request a new one.
    </div>
  )
}
