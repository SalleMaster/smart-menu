'use client'

import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

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
    title: 'Home',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Categories',
    url: 'categories',
    icon: Inbox,
  },
  {
    title: 'Products',
    url: 'products',
    icon: Calendar,
  },
  {
    title: 'Contact',
    url: 'contact',
    icon: Search,
  },
  {
    title: 'Working Hours',
    url: 'working-hours',
    icon: Settings,
  },
  {
    title: 'Wi-Fi',
    url: 'wifi',
    icon: Settings,
  },
  {
    title: 'Notifications',
    url: 'notifications',
    icon: Settings,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { organizationSlug } = useParams<{ organizationSlug: string }>()

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
                    isActive={pathname === `/${organizationSlug}/${item.url}`}
                  >
                    <Link
                      href={`/${organizationSlug}/${item.url}`}
                      className='py-6'
                    >
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
