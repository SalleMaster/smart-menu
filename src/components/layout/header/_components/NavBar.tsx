'use client'

import Link from 'next/link'
import { use } from 'react'
import { Session } from '@/lib/auth-client'
import UserDropdown from './UserDropdown'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-react'

type Props = {
  sessionPromise: Promise<Session | null>
}

export default function NavBar({ sessionPromise }: Props) {
  const session = use(sessionPromise)

  return (
    <div className='px-4 mx-auto flex items-center justify-between py-2'>
      <div className='flex gap-3 items-center'>
        <SidebarTrigger />
        <Link href='/' className='font-bold'>
          Smart menu
        </Link>
      </div>

      <div className='flex gap-3 items-center'>
        <ModeToggle />
        {session ? (
          <UserDropdown session={session} />
        ) : (
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full'
            aria-label='User'
            disabled
          >
            <UserIcon className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}

export function NavBarSkeleton() {
  return (
    <div className='px-4 mx-auto flex items-center justify-between py-2'>
      <div className='flex gap-3 items-center'>
        <SidebarTrigger />
        <Link href='/' className='font-bold'>
          Smart menu
        </Link>
      </div>

      <div className='flex gap-3 items-center'>
        <ModeToggle />
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='User'
          disabled
        >
          <UserIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
