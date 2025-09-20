import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Organization } from '@/generated/prisma'
import { SquareUser } from 'lucide-react'
import { EditOrganizationForm } from './EditOrganizationForm'

type Props = {
  organization: Organization
}

export default function OrganizationCard({ organization }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={organization?.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <SquareUser />

              <span className='font-semibold'>{organization?.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <EditOrganizationForm organization={organization} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function OrganizationCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-4 pr-4'>
        <div className='w-6'>
          <SquareUser />
        </div>

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
