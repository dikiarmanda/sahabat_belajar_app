import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button>Daftar</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Selamat Datang di {APP_NAME}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Platform manajemen komunitas lengkap dengan fitur artikel, event, dan akuntansi terintegrasi.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Mulai Sekarang</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Masuk ke Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
