import { Suspense } from 'react'
import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { UserDetailsPage, UserDetailsPageSkeleton } from './UserDetailsPage'
import { getUser, UserWithRelations } from '@/data/services/users'

export const metadata: Metadata = {
  title: 'User Details | Admin',
}

export default async function Page(props: PageProps<'/dashboard/users/[id]'>) {
  const params = await props.params
  const { id } = params

  await pageGuard({ callbackUrl: `/dashboard/users/${id}`, adminGuard: true })

  const userPromise = getUser({
    where: { id },
    include: { organization: true },
  }) as Promise<UserWithRelations | null>

  return (
    <Suspense fallback={<UserDetailsPageSkeleton />}>
      <UserDetailsPage userPromise={userPromise} />
    </Suspense>
  )
}
