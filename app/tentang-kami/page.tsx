import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { Target, Heart, ArrowLeft } from 'lucide-react'

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight md:text-2xl hover:opacity-80">
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/#tentang">
              <Button variant="ghost" size="sm">
                Tentang
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

        {/* Tentang Kami */}
        <section className="mb-16 md:mb-24">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
            Tentang Kami
          </h1>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Diskusi komunitas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Sahabat Belajar adalah komunitas yang hadir untuk mendukung proses
                belajar dan berbagi ilmu. Kami percaya bahwa setiap orang bisa
                menjadi sahabat bagi orang lain dalam perjalanan belajar.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Dengan semangat gotong royong, kami menyelenggarakan kegiatan edukatif,
                diskusi, dan event yang membangun serta menginspirasi. Komunitas ini
                terbuka bagi siapa saja yang ingin belajar, berbagi, dan tumbuh bersama.
              </p>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section id="visi-misi" className="border-t pt-16 md:pt-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-12">
            Visi & Misi
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary shrink-0" />
                <h3 className="text-xl font-semibold">Visi</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi komunitas belajar yang inklusif dan bermanfaat bagi
                masyarakat, serta mendorong budaya literasi dan kolaborasi.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary shrink-0" />
                <h3 className="text-xl font-semibold">Misi</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside text-left">
                <li>Menyelenggarakan kegiatan belajar dan diskusi rutin</li>
                <li>Mengelola konten edukatif melalui artikel dan event</li>
                <li>Menjalin jejaring dengan komunitas dan pegiat pendidikan</li>
                <li>Mengelola keuangan komunitas secara transparan</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
