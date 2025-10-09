'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { User, DollarSignIcon, PlusIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Organizations',
    url: '/dashboard/organizations',
    icon: DollarSignIcon,
  },
  {
    title: 'Add Organization',
    url: '/dashboard/organizations/add',
    icon: PlusIcon,
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: User,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.url ||
                      (pathname !== '/dashboard/organizations/add' &&
                        pathname.startsWith(item.url))
                    }
                  >
                    <Link href={item.url} className='py-6'>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
