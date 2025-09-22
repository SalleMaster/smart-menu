import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { getOrganization } from '@/data/services/organizations'
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

  await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate a delay for demo purposes

  const organizationPromise = getOrganization({ where: { slug } })

  return (
    <Suspense fallback={<OrganizationDetailsPageSkeleton />}>
      <OrganizationDetailsPage organizationPromise={organizationPromise} />
    </Suspense>
  )
}
