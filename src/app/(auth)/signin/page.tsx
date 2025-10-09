import SignInForm from './_components/SignInForm'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { getLoggedInUserCallbackUrl } from '../_actions/actions'

export default async function SignInPage(props: PageProps<'/signin'>) {
  const session = await getSession()
  const callbackUrlSearchParam = (await props.searchParams).callbackUrl
  const callbackUrl =
    typeof callbackUrlSearchParam === 'string' ? callbackUrlSearchParam : null

  if (session) {
    session.user.role === 'admin' && redirect(callbackUrl || '/dashboard')

    // For non-admin users, determine the appropriate callback URL
    const userCallbackUrlResponse = await getLoggedInUserCallbackUrl()
    redirect(callbackUrl || userCallbackUrlResponse.callbackUrl)
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  )
}
