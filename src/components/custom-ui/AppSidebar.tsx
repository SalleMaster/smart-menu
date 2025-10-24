'use client'

import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'

import {
  Package,
  Home,
  Logs,
  NotebookTabs,
  Settings,
  AlarmClock,
  WifiCog,
  Bell,
} from 'lucide-react'

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
    title: 'Početna',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Kategorije',
    url: 'categories',
    icon: Logs,
  },
  {
    title: 'Proizvodi',
    url: 'products',
    icon: Package,
  },
  {
    title: 'Kontakt',
    url: 'contact',
    icon: NotebookTabs,
  },
  {
    title: 'Radno vreme',
    url: 'working-hours',
    icon: AlarmClock,
  },
  {
    title: 'Wi-Fi',
    url: 'wifi',
    icon: WifiCog,
  },
  {
    title: 'Obaveštenja',
    url: 'notifications',
    icon: Bell,
  },
  {
    title: 'Podešavanja',
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
          {/* <SidebarGroupLabel>Applikacija</SidebarGroupLabel> */}
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
