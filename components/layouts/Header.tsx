'use client'

import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { SessionUser } from '@/types'

interface HeaderProps {
  user: SessionUser
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user.full_name} ({user.role_name || 'Member'})
          </span>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
