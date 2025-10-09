import { AdminSidebar } from '@/components/custom-ui/AdminSidebar'
import Header from '@/components/layout/header/Header'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Admin',
  description: 'Manage your dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className='w-full'>
        <Header />
        <section className='container mx-auto p-4'>{children}</section>
      </main>
    </SidebarProvider>
  )
}
