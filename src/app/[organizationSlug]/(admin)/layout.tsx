import Header from '@/components/layout/header/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your organization',
}

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className='container mx-auto py-4'>{children}</main>
    </>
  )
}
