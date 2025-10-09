'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient, Session } from '@/lib/auth-client'
import { UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  session: Session
}

export default function UserDropdown({ session }: Props) {
  const router = useRouter()

  const handleSignOut = async () => {
    return await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/signin')
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='User'
        >
          <UserIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session.user.name} <br />{' '}
          <span className='text-xs text-muted-foreground'>
            {session.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <UserIcon className='h-4 w-4' /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
