'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, FileText, Calendar, Calculator } from 'lucide-react'
import type { SessionUser } from '@/types'

interface SidebarProps {
  user: SessionUser
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Artikel',
    href: '/dashboard/articles',
    icon: FileText,
    roles: ['Admin', 'Editor'],
  },
  {
    title: 'Event',
    href: '/dashboard/events',
    icon: Calendar,
  },
  {
    title: 'Akuntansi',
    href: '/dashboard/accounting',
    icon: Calculator,
    roles: ['Admin', 'Accountant'],
  },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes(user.role_name || 'Member')
  })

  return (
    <aside className="w-64 border-r bg-gray-50">
      <nav className="p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-gray-100 text-gray-700'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
