'use client'

import { use } from 'react'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { UserWithRelations } from '@/data/services/users'
import {
  UserCardDetails,
  UserCardDetailsSkeleton,
} from '../_components/UserCard'

type Props = {
  userPromise: Promise<UserWithRelations | null>
}

export function UserDetailsPage({ userPromise }: Props) {
  const user = use(userPromise)

  return (
    <DashboardPageLayout title='User Details'>
      {user ? (
        <UserCardDetails user={user} />
      ) : (
        <Alert variant='default'>
          <Info />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            We could not find the user you are looking for.
          </AlertDescription>
        </Alert>
      )}
    </DashboardPageLayout>
  )
}

export function UserDetailsPageSkeleton() {
  return (
    <DashboardPageLayout title='User Details'>
      <UserCardDetailsSkeleton />
    </DashboardPageLayout>
  )
}
