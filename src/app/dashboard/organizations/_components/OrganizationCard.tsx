import Link from 'next/link'
import { Organization } from '@/generated/prisma'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Hash, SquareArrowOutUpRight, SquareUser } from 'lucide-react'
import { EditOrganizationForm } from './EditOrganizationForm'
import { buttonVariants } from '@/components/ui/button'

type Props = {
  organization: Organization
}

export default function OrganizationCard({ organization }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={organization?.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='flex w-full justify-between'>
              <div className='flex items-center gap-4'>
                <Hash />
                <p className='font-semibold'>{organization.name}</p>
              </div>

              <Link
                href={`/dashboard/organizations/${organization.slug}`}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'icon',
                })}
              >
                <SquareArrowOutUpRight className='w-2 h-2' />
              </Link>
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
      <div className='flex gap-4 items-center w-full'>
        <Hash />
        <Skeleton className='h-9 w-full' />
      </div>
    </Card>
  )
}
