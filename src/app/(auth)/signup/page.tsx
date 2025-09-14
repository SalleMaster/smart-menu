import getSession from '@/lib/getSession'
import SignUpForm from './_components/SignUpForm'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <SignUpForm />
    </div>
  )
}
