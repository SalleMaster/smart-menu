import { AppSidebar } from '@/components/custom-ui/AppSidebar'
import Header from '@/components/layout/header/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your organization',
}

export default function OwnerDashboardLayout(
  props: LayoutProps<'/[organizationSlug]'>
) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className='w-full'>
        <Header />
        <section className='container mx-auto p-4'>{props.children}</section>
      </main>
    </SidebarProvider>
  )
}
