import SignInForm from './_components/SignInForm'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'

export default async function SignInPage(props: PageProps<'/signin'>) {
  const session = await getSession()
  const callbackUrlSearchParam = (await props.searchParams).callbackUrl
  const callbackUrl =
    typeof callbackUrlSearchParam === 'string'
      ? callbackUrlSearchParam
      : '/dashboard'

  if (session) {
    redirect(callbackUrl)
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  )
}
