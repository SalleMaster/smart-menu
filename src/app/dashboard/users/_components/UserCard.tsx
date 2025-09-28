import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, SquareArrowOutUpRight, User2 } from 'lucide-react'
import Link from 'next/link'
import { format, Locale } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import clsx from 'clsx'
import { USER_ROLES } from '@/lib/types'
import { UserWithRelations } from '@/data/services/users'

type Props = {
  user: UserWithRelations
}

export function UserCard({ user }: Props) {
  const formattedCreatedAt = formatDate({
    date: user.createdAt,
    locale: srLatn,
  })
  // const formattedCreatedAt = format(user.createdAt, 'PPpp', {
  //   locale: srLatn,
  // })

  const roleLabel = getUserRoleLabel(user.role)

  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={user?.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-4'>
              <div className='flex items-center gap-4'>
                <User2 />
                <p className='font-semibold'>{user.name}</p>
              </div>

              <div className='flex items-center gap-4'>
                <Mail />
                <p className='font-semibold'>{user.email}</p>
              </div>

              <div className='flex items-center gap-4 sm:ml-auto'>
                <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                  {roleLabel}
                </Badge>
              </div>

              <Link
                href={`/dashboard/users/${user.id}`}
                className={clsx(
                  buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                  }),
                  'sm:ml-auto'
                )}
              >
                <SquareArrowOutUpRight className='w-2 h-2' />
              </Link>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className='grid md:grid-cols-2 p-4'>
              <div className='space-y-2'>
                <Label>ID</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.id}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Name</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.name}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Email</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.email}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Role</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {roleLabel}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Organization</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.organization?.name || 'No organization'}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Created At</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {formattedCreatedAt}
                </p>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function UserCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='flex gap-4 items-center w-full'>
        <User2 />
        <Skeleton className='h-9 w-full' />
      </div>
    </Card>
  )
}

export function UserCardDetails({ user }: Props) {
  const formattedCreatedAt = formatDate({
    date: user.createdAt,
    locale: srLatn,
  })

  const roleLabel = getUserRoleLabel(user.role)

  return (
    <Card className='grid md:grid-cols-2 p-4'>
      <div className='space-y-2'>
        <Label>ID</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {user.id}
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Name</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {user.name}
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Email</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {user.email}
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Role</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {roleLabel}
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Organization</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {user.organization?.name || 'No organization'}
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Created At</Label>
        <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
          {formattedCreatedAt}
        </p>
      </div>
    </Card>
  )
}

export function UserCardDetailsSkeleton() {
  return (
    <Card className='grid md:grid-cols-2 p-4'>
      <div className='space-y-2'>
        <Label>ID</Label>
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Label>Name</Label>
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Label>Email</Label>
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Label>Role</Label>
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Label>Organization</Label>
        <Skeleton className='h-9 w-full' />
      </div>
      <div className='space-y-2'>
        <Label>Created At</Label>
        <Skeleton className='h-9 w-full' />
      </div>
    </Card>
  )
}

function getUserRoleLabel(role: string | null) {
  let roleLabel = ''

  switch (role) {
    case USER_ROLES.ADMIN:
      roleLabel = 'Admin'
      break
    case USER_ROLES.USER:
      roleLabel = 'User'
      break
    default:
      roleLabel = 'Unknown'
  }

  return roleLabel
}

function formatDate({ date, locale }: { date: Date; locale: Locale }) {
  return format(date, 'PPpp', {
    locale,
  })
}
