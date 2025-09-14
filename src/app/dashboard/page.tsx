import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await getSession()

  if (!session) {
    return redirect('/signin')
  }

  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-lg text-center sm:text-left'>
          Welcome to your dashboard! Here you can manage your settings and view
          your data.
        </p>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <Link href='/dashboard/users'>Manage Users</Link>
      </footer>
    </div>
  )
}
