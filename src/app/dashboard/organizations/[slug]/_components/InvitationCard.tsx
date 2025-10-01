import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Invitation } from '@/generated/prisma'
import { Mail } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

type Props = {
  invitation: Invitation
}

export function InvitationCard({ invitation }: Props) {
  const formattedCreatedAt = format(invitation.createdAt, 'PPpp', {
    locale: srLatn,
  })

  const formattedExpiresAt = format(invitation.expiresAt, 'PPpp', {
    locale: srLatn,
  })

  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={invitation?.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-2'>
              <div className='flex items-center gap-4'>
                <Mail />
                <p className='font-semibold'>{invitation.email}</p>
              </div>

              <div className='flex items-center gap-4 sm:mr-auto'>
                <Badge variant={invitation.accepted ? 'default' : 'outline'}>
                  {invitation.accepted ? 'Accepted' : 'Pending'}
                </Badge>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className='grid md:grid-cols-2 p-4'>
              <div className='space-y-2'>
                <Label>Email</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {invitation.email}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Accepted</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {invitation.accepted ? 'Yes' : 'No'}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Created At</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {formattedCreatedAt}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Expires At</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {formattedExpiresAt}
                </p>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
