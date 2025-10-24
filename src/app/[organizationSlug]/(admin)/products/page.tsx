import { Suspense } from 'react'
import { Metadata } from 'next'
import { ownerPageGuard } from '@/lib/pageGuard'
import ProductsPage, { ProductsPageSkeleton } from './ProductsPage'
import { getOrganization } from '@/data/services/organizations'
import { getProducts, ProductWithCategories } from '@/data/services/products'
import { getCategories } from '@/data/services/categories'

export const metadata: Metadata = {
  title: 'Proizvodi | Admin',
}

export default async function Page(
  props: PageProps<'/[organizationSlug]/products'>
) {
  const params = await props.params
  const { organizationSlug } = params
  await ownerPageGuard({
    callbackUrl: `/${organizationSlug}/products`,
    organizationSlug,
  })

  const productsPromise = getProducts({
    where: { organization: { slug: organizationSlug } },
    include: { categories: true },
    orderBy: { createdAt: 'desc' },
  }) as Promise<ProductWithCategories[]>

  const organizationPromise = getOrganization({
    where: { slug: organizationSlug },
  })

  const categoriesPromise = getCategories({
    where: { organization: { slug: organizationSlug } },
    orderBy: { name: 'asc' },
  })

  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPage
        productsPromise={productsPromise}
        organizationPromise={organizationPromise}
        categoriesPromise={categoriesPromise}
      />
    </Suspense>
  )
}
