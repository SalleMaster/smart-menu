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
import { authClient } from '@/lib/auth-client'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UserDropdown() {
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
          aria-label='Korisnik'
        >
          <UserIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/dashboard/organizations'>Organizations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/dashboard/organizations/add'>Add Organization</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/dashboard/users'>Users</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
