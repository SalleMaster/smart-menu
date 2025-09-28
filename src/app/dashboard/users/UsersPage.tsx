'use client'

import { use } from 'react'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import { UserCard, UserCardSkeleton } from './_components/UserCard'
import { UserWithRelations } from '@/data/services/users'

type Props = {
  usersPromise: Promise<UserWithRelations[]>
}

export default function UsersPage({ usersPromise }: Props) {
  const users = use(usersPromise)

  return (
    <DashboardPageLayout title='Users'>
      <ul className='space-y-3'>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </DashboardPageLayout>
  )
}

export function UsersPageSkeleton() {
  return (
    <DashboardPageLayout title='Users'>
      <div className='space-y-3'>
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
      </div>
    </DashboardPageLayout>
  )
}
