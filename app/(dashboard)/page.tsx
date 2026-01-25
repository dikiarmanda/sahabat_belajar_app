import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Selamat Datang</CardTitle>
            <CardDescription>Halo, {session.full_name}!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Anda masuk sebagai <strong>{session.role_name || 'Member'}</strong>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fitur Tersedia</CardTitle>
            <CardDescription>Manajemen konten dan event</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fitur lengkap akan segera tersedia
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
