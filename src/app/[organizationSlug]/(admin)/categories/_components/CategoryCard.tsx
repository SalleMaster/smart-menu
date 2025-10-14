import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { CategoryForm } from './CategoryForm'
import { Skeleton } from '@/components/ui/skeleton'
import { Category, Organization } from '@/generated/prisma'
import { Logs } from 'lucide-react'

type Props = {
  category?: Category
  organization: Organization | null
}

export default function CategoryCard({ category, organization }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={category?.id || 'create-category'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Logs />
              <span className='font-semibold'>
                {category?.name || 'Nova kategorija'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CategoryForm category={category} organization={organization} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function CategoryCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-3 pr-4'>
        <Logs />

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
