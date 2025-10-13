import { use } from 'react'
import CategoryCard, { CategoryCardSkeleton } from './_components/CategoryCard'
import { Category, Organization } from '@/generated/prisma'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'

type Props = {
  categoriesPromise: Promise<Category[]>
  organizationPromise: Promise<Organization | null>
}

export default function CategoriesPage({
  categoriesPromise,
  organizationPromise,
}: Props) {
  const categories = use(categoriesPromise)
  const organization = use(organizationPromise)

  const activeCategories = categories.filter((category) => category.active)
  const inactiveCategories = categories.filter((category) => !category.active)

  return (
    <DashboardPageLayout title='Kategorije'>
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Nova</h2>
          <CategoryCard organization={organization} />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Aktivne</h2>
          {activeCategories.length > 0 ? (
            activeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                organization={organization}
              />
            ))
          ) : (
            <Alert variant='default'>
              <Info />
              <AlertTitle>Obaveštenje</AlertTitle>
              <AlertDescription>
                Trenutno nema aktivnih kategorija
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Neaktivne</h2>
          {inactiveCategories.length > 0 ? (
            inactiveCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                organization={organization}
              />
            ))
          ) : (
            <Alert variant='default'>
              <Info />
              <AlertTitle>Obaveštenje</AlertTitle>
              <AlertDescription>
                Trenutno nema neaktivnih kategorija
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </DashboardPageLayout>
  )
}

export function CategoriesPageSkeleton() {
  return (
    <DashboardPageLayout title='Kategorije'>
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Nova</h2>
          <CategoryCardSkeleton />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Aktivne</h2>
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Neaktivne</h2>
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </div>
      </div>
    </DashboardPageLayout>
  )
}
