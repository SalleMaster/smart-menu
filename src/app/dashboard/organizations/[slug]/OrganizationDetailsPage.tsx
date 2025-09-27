'use client'

import { use } from 'react'
import { GetOrganizationReturnType } from '@/data/services/organizations'

import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  EditOrganizationForm,
  EditOrganizationFormSkeleton,
} from '../_components/EditOrganizationForm'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import InviteUserForm from './_components/InviteUserForm'

type Props = {
  organizationPromise: GetOrganizationReturnType
}

export default function OrganizationDetailsPage({
  organizationPromise,
}: Props) {
  const organization = use(organizationPromise)

  return (
    <DashboardPageLayout title='Organization Details'>
      {organization ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{organization.name}</CardTitle>
              <CardDescription>Edit organization</CardDescription>
            </CardHeader>
            <CardContent>
              <EditOrganizationForm organization={organization} />
            </CardContent>
          </Card>

          <InviteUserForm
            organizationId={organization.id}
            organizationSlug={organization.slug}
            organizationName={organization.name}
          />
        </>
      ) : (
        <Alert variant='default'>
          <Info />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            We could not find the organization you are looking for.
          </AlertDescription>
        </Alert>
      )}
    </DashboardPageLayout>
  )
}

export function OrganizationDetailsPageSkeleton() {
  return (
    <DashboardPageLayout title='Organization Details'>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-4 w-1/2' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-5 w-1/3' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditOrganizationFormSkeleton />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  )
}
