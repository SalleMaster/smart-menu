import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import {
  getOrganization,
  OrganizationWithRelations,
} from '@/data/services/organizations'
import { Suspense } from 'react'
import OrganizationDetailsPage, {
  OrganizationDetailsPageSkeleton,
} from './OrganizationDetailsPage'

export const metadata: Metadata = {
  title: 'Organization Details | Admin',
}

export default async function Page(
  props: PageProps<'/dashboard/organizations/[slug]'>
) {
  const params = await props.params
  const { slug } = params

  await pageGuard({
    callbackUrl: `/dashboard/organizations/${slug}`,
    adminGuard: true,
  })

  const organizationPromise = getOrganization({
    where: { slug },
    include: { users: true, invitations: true },
  }) as Promise<OrganizationWithRelations | null>

  return (
    <Suspense fallback={<OrganizationDetailsPageSkeleton />}>
      <OrganizationDetailsPage organizationPromise={organizationPromise} />
    </Suspense>
  )
}
