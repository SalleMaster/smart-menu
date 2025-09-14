'use client'

import Link from 'next/link'
import { use } from 'react'
import { Session } from '@/lib/auth-client'
import UserDropdown from './UserDropdown'

type Props = {
  sessionPromise: Promise<Session | null>
}

export default function NavBar({ sessionPromise }: Props) {
  const session = use(sessionPromise)

  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        Smart menu
      </Link>

      <div className='flex gap-3 align-middle'>
        {session ? <UserDropdown /> : 'Logged out'}
        {/* {user && <CartButton cartItemsNumber={cartItemsNumber} />} */}
        {/* <User user={user} /> */}
      </div>
    </div>
  )
}

export function NavBarSkeleton() {
  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        Smart menu
      </Link>
    </div>
  )
}
