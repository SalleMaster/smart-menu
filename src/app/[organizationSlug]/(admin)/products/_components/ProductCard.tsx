import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { ProductForm } from './ProductForm'
import { Skeleton } from '@/components/ui/skeleton'
import { Category, Organization } from '@/generated/prisma'
import { Package, PackagePlus } from 'lucide-react'
import { ProductWithCategories } from '@/data/services/products'

type Props = {
  product?: ProductWithCategories
  organization: Organization | null
  categories: Category[]
}

export default function ProductCard({
  product,
  organization,
  categories,
}: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={product?.id || 'create-product'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              {product?.name ? <Package /> : <PackagePlus />}
              <span className='font-semibold'>
                {product?.name || 'Novi proizvod'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ProductForm
              product={product}
              organization={organization}
              categories={categories}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-3 pr-4'>
        <Package />

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
