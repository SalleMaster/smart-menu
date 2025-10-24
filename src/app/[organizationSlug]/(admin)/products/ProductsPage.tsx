import { use } from 'react'
import { Category, Organization } from '@/generated/prisma'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import ProductCard, { ProductCardSkeleton } from './_components/ProductCard'
import { ProductWithCategories } from '@/data/services/products'

type Props = {
  productsPromise: Promise<ProductWithCategories[]>
  organizationPromise: Promise<Organization | null>
  categoriesPromise: Promise<Category[]>
}

export default function ProductsPage({
  productsPromise,
  organizationPromise,
  categoriesPromise,
}: Props) {
  const products = use(productsPromise)
  const organization = use(organizationPromise)
  const categories = use(categoriesPromise)

  return (
    <DashboardPageLayout title='Proizvodi'>
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Novi proizvod</h2>
          <ProductCard organization={organization} categories={categories} />
        </div>

        <div className='space-y-3'>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                organization={organization}
                categories={categories}
              />
            ))
          ) : (
            <Alert variant='default'>
              <Info />
              <AlertTitle>Obaveštenje</AlertTitle>
              <AlertDescription>Trenutno nema proizvoda</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </DashboardPageLayout>
  )
}

export function ProductsPageSkeleton() {
  return (
    <DashboardPageLayout title='Proizvodi'>
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Novi proizvod</h2>
          <ProductCardSkeleton />
        </div>

        <div className='space-y-3'>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </DashboardPageLayout>
  )
}
