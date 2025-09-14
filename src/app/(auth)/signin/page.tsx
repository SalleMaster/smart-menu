import { redirect } from 'next/navigation'
import SignInForm from './_components/SignInForm'
import getSession from '@/lib/getSession'

export default async function SignIn() {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <SignInForm />
    </div>
  )
}
