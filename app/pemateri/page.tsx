import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { Users, ArrowLeft } from 'lucide-react'

export default function PemateriPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight md:text-2xl hover:opacity-80">
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/#pemateri">
              <Button variant="ghost" size="sm">
                Pemateri
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

        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Pemateri & Narasumber
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Para pemateri dan narasumber yang berbagi ilmu dalam kegiatan Sahabat Belajar.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                alt="Pemateri Pendidikan & Literasi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">Nama Pemateri</h2>
              <p className="mt-1 text-sm text-muted-foreground">Pendidikan & Literasi</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Berbagi ilmu seputar literasi dan metode belajar yang efektif.
              </p>
            </div>
          </article>

          <article className="rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                alt="Pemateri Komunitas & Kolaborasi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">Nama Pemateri</h2>
              <p className="mt-1 text-sm text-muted-foreground">Komunitas & Kolaborasi</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Memfasilitasi jejaring dan kolaborasi antar komunitas.
              </p>
            </div>
          </article>

          <article className="rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                alt="Pemateri Workshop & Pelatihan"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">Nama Pemateri</h2>
              <p className="mt-1 text-sm text-muted-foreground">Workshop & Pelatihan</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Mengisi workshop dan pelatihan keterampilan praktis.
              </p>
            </div>
          </article>

          <article className="rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                alt="Pemateri Event & Moderator"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">Nama Pemateri</h2>
              <p className="mt-1 text-sm text-muted-foreground">Event & Moderator</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                Memandu diskusi dan acara komunitas Sahabat Belajar.
              </p>
            </div>
          </article>
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Ingin mengundang pemateri atau menjadi narasumber? Hubungi kami via WhatsApp.
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
