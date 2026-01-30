import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { CalendarDays, ArrowLeft } from 'lucide-react'

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight md:text-2xl hover:opacity-80">
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/#event">
              <Button variant="ghost" size="sm">
                Event
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 md:px-8 lg:px-10 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
              <CalendarDays className="h-8 w-8 text-primary" />
              Event
            </h1>
            <p className="mt-2 text-muted-foreground">
              Webinar, workshop, dan kegiatan rutin dari Sahabat Belajar.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border bg-card overflow-hidden shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[16/10]">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                alt="Tips Belajar Efektif"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">Webinar</p>
              <h2 className="mt-1 text-xl font-semibold">Tips Belajar Efektif</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sabtu, 15 Feb 2026 · 10:00 WIB
              </p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Belajar cara mengatur waktu dan strategi belajar yang efektif untuk pemula.
              </p>
            </div>
          </article>

          <article className="rounded-xl border bg-card overflow-hidden shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[16/10]">
              <Image
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80"
                alt="Menulis Artikel Populer"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">Workshop</p>
              <h2 className="mt-1 text-xl font-semibold">Menulis Artikel Populer</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Minggu, 23 Feb 2026 · 14:00 WIB
              </p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Workshop menulis artikel yang enak dibaca dan bermanfaat untuk pembaca.
              </p>
            </div>
          </article>

          <article className="rounded-xl border bg-card overflow-hidden shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[16/10]">
              <Image
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80"
                alt="Ngobrol Literasi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">Diskusi</p>
              <h2 className="mt-1 text-xl font-semibold">Ngobrol Literasi</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sabtu, 1 Mar 2026 · 09:00 WIB
              </p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Diskusi santai seputar literasi, buku, dan kebiasaan membaca.
              </p>
            </div>
          </article>
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Daftar event akan diperbarui secara berkala. Hubungi kami via WhatsApp untuk info pendaftaran.
        </p>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
