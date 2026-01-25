import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={session} />
      <div className="flex flex-1">
        <Sidebar user={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
