import { Suspense } from 'react'
import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import UsersPage, { UsersPageSkeleton } from './UsersPage'
import { getUsers, UserWithRelations } from '@/data/services/users'

export const metadata: Metadata = {
  title: 'Users | Admin',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/dashboard/users', adminGuard: true })

  const usersPromise = getUsers({
    orderBy: { createdAt: 'desc' },
    include: { organization: true },
  }) as Promise<UserWithRelations[]>

  return (
    <Suspense fallback={<UsersPageSkeleton />}>
      <UsersPage usersPromise={usersPromise} />
    </Suspense>
  )
}
