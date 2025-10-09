'use client'

import { use } from 'react'
import { OrganizationWithRelations } from '@/data/services/organizations'

import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { UserCard } from '../../users/_components/UserCard'
import { InvitationCard } from './_components/InvitationCard'

type Props = {
  organizationPromise: Promise<OrganizationWithRelations | null>
}

export default function OrganizationDetailsPage({
  organizationPromise,
}: Props) {
  const organization = use(organizationPromise)

  return (
    <DashboardPageLayout title='Organization Details'>
      {organization ? (
        <Tabs defaultValue='details'>
          <TabsList>
            <TabsTrigger value='details'>Details</TabsTrigger>
            <TabsTrigger value='users'>Users</TabsTrigger>
            <TabsTrigger value='invite'>Invite</TabsTrigger>
            <TabsTrigger value='invitations'>Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value='details'>
            <Card>
              <CardHeader>
                <CardTitle>{organization.name}</CardTitle>
                <CardDescription>Edit organization</CardDescription>
              </CardHeader>
              <CardContent>
                <EditOrganizationForm organization={organization} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='users'>
            {organization.users.length === 0 && (
              <Alert variant='default'>
                <Info />
                <AlertTitle>No Users Found</AlertTitle>
                <AlertDescription>
                  This organization has no users yet.
                </AlertDescription>
              </Alert>
            )}
            <ul className='space-y-3'>
              {organization.users.map((user) => (
                <li key={user.id}>
                  <UserCard user={{ ...user, organization }} />
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value='invite' className='space-y-4'>
            <InviteUserForm
              organizationId={organization.id}
              organizationSlug={organization.slug}
              organizationName={organization.name}
            />
          </TabsContent>
          <TabsContent value='invitations' className='space-y-4'>
            {organization.invitations.length === 0 && (
              <Alert variant='default' className='mt-3'>
                <Info />
                <AlertTitle>No Invitations Found</AlertTitle>
                <AlertDescription>
                  This organization has no pending invitations.
                </AlertDescription>
              </Alert>
            )}
            <ul className='space-y-3'>
              {organization.invitations.map((invitation) => (
                <li key={invitation.id}>
                  <InvitationCard invitation={invitation} />
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
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
      <Tabs defaultValue='details'>
        <TabsList>
          <TabsTrigger value='details'>Details</TabsTrigger>
          <TabsTrigger value='users'>Users</TabsTrigger>
          <TabsTrigger value='invite'>Invite</TabsTrigger>
          <TabsTrigger value='invitations'>Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value='details'>
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
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  )
}
