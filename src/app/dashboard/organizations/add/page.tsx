import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import DashboardPageLayout from '@/components/layout/dashboard-page-layout/DashboardPageLayout'
import AddOrganizationForm from './_components/AddOrganizationForm'

export const metadata: Metadata = {
  title: 'Add Organization | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/dashboard/organizations/add',
    adminGuard: true,
  })

  return (
    <DashboardPageLayout title='Add Organization'>
      <AddOrganizationForm />
    </DashboardPageLayout>
  )
}
