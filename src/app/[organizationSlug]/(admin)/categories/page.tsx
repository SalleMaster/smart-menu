import { Suspense } from 'react'
import { Metadata } from 'next'
import { ownerPageGuard, pageGuard } from '@/lib/pageGuard'
import { getCategories } from '@/data/services/categories'
import CategoriesPage, { CategoriesPageSkeleton } from './CategoriesPage'
import { getOrganization } from '@/data/services/organizations'

export const metadata: Metadata = {
  title: 'Kategorije | Admin',
}

export default async function Page(
  props: PageProps<'/[organizationSlug]/categories'>
) {
  const params = await props.params
  const { organizationSlug } = params
  await ownerPageGuard({
    callbackUrl: `/${organizationSlug}/categories`,
    organizationSlug,
  })

  const categoriesPromise = getCategories({
    where: { organization: { slug: organizationSlug } },
    orderBy: { createdAt: 'desc' },
  })

  const organizationPromise = getOrganization({
    where: { slug: organizationSlug },
  })

  return (
    <Suspense fallback={<CategoriesPageSkeleton />}>
      <CategoriesPage
        categoriesPromise={categoriesPromise}
        organizationPromise={organizationPromise}
      />
    </Suspense>
  )
}
