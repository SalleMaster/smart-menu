import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { getOrganizations } from '@/data/services/organizations'
import { Suspense } from 'react'
import OrganizationsPage, {
  OrganizationsPageSkeleton,
} from './OrganizationsPage'

export const metadata: Metadata = {
  title: 'Organizations | Admin',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/dashboard/organizations', adminGuard: true })

  const organizationsPromise = getOrganizations()

  return (
    <Suspense fallback={<OrganizationsPageSkeleton />}>
      <OrganizationsPage organizationsPromise={organizationsPromise} />
    </Suspense>
  )
}
