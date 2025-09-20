'use client'

import { use } from 'react'
import { GetOrganizationsReturnType } from '@/data/services/organizations'
import OrganizationCard, {
  OrganizationCardSkeleton,
} from './_components/OrganizationCard'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'

type Props = {
  organizationsPromise: GetOrganizationsReturnType
}

export default function OrganizationsPage({ organizationsPromise }: Props) {
  const organizations = use(organizationsPromise)

  return (
    <DashboardPageLayout title='Organizations'>
      <ul className='space-y-3'>
        {organizations.map((organization) => (
          <li key={organization.id}>
            <OrganizationCard organization={organization} />
          </li>
        ))}
      </ul>
    </DashboardPageLayout>
  )
}

export function OrganizationsPageSkeleton() {
  return (
    <DashboardPageLayout title='Organizations'>
      <div className='space-y-3'>
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
      </div>
    </DashboardPageLayout>
  )
}
