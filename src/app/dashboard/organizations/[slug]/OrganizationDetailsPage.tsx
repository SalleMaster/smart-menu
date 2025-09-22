'use client'

import { use } from 'react'
import {
  GetOrganizationReturnType,
  GetOrganizationsReturnType,
} from '@/data/services/organizations'

import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import { OrganizationCardSkeleton } from '../_components/OrganizationCard'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EditOrganizationForm } from '../_components/EditOrganizationForm'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Terminal } from 'lucide-react'

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
        <Card>
          <CardHeader>
            <CardTitle>{organization.name}</CardTitle>
            <CardDescription>Edit organization</CardDescription>
          </CardHeader>
          <CardContent>
            <EditOrganizationForm organization={organization} />
          </CardContent>
        </Card>
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
    <DashboardPageLayout title='Organizations'>
      <div className='space-y-3'>
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
        <OrganizationCardSkeleton />
      </div>
    </DashboardPageLayout>
  )
}
