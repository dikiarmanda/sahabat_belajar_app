import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import {
  BookOpen,
  Users,
  Calendar,
  MapPin,
  MessageCircle,
  CalendarDays,
  Library,
} from 'lucide-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285732957608'
const WA_DEFAULT_MESSAGE = process.env.NEXT_PUBLIC_WA_DEFAULT_MESSAGE ?? 'Hai saya tertarik untuk berkolaborasi dengan Sahabat Belajar'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_DEFAULT_MESSAGE)}`

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">
            {APP_NAME}
          </h1>
          <nav>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero - full width dengan gambar */}
        <section className="relative border-b min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
              alt="Belajar bersama"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
          </div>
          <div className="container mx-auto px-6 md:px-8 lg:px-10 py-20 relative z-10">
            <div className="max-w-xl rounded-2xl bg-black/60 backdrop-blur-sm px-6 py-6 md:px-8 md:py-8 border border-white/10">
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-sm">
                Komunitas Sahabat Belajar
              </h2>
              <p className="mt-6 text-lg text-white/95 leading-relaxed">
                Wadah belajar bersama untuk mengembangkan potensi dan menebar manfaat
                melalui pendidikan dan kebersamaan.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-full px-8 gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a]">
                    <MessageCircle className="h-5 w-5" />
                    Chat via WhatsApp
                  </Button>
                </a>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 bg-transparent border-white/80 text-white hover:bg-white/15 hover:text-white hover:border-white">
                    <CalendarDays className="h-5 w-5" />
                    Lihat Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Event - di atas Tentang Kami */}
        <section id="event" className="border-b bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Event
                </h3>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                  Kegiatan webinar, workshop, dan pertemuan rutin dari Sahabat Belajar.
                </p>
              </div>
              <Link href="/events">
                <Button variant="outline" className="rounded-full gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Lihat Semua Event
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/events" className="group rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                    alt="Event"
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Webinar</p>
                  <h4 className="mt-1 font-semibold group-hover:text-primary">Tips Belajar Efektif</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Sabtu, 15 Feb 2026 · 10:00 WIB</p>
                </div>
              </Link>
              <Link href="/events" className="group rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80"
                    alt="Event"
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Workshop</p>
                  <h4 className="mt-1 font-semibold group-hover:text-primary">Menulis Artikel Populer</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Minggu, 23 Feb 2026 · 14:00 WIB</p>
                </div>
              </Link>
              <Link href="/events" className="group rounded-xl border bg-card overflow-hidden shadow-sm text-left transition hover:shadow-md">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80"
                    alt="Event"
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Diskusi</p>
                  <h4 className="mt-1 font-semibold group-hover:text-primary">Ngobrol Literasi</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Sabtu, 1 Mar 2026 · 09:00 WIB</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Tentang Kami - kiri teks, kanan gambar */}
        <section id="tentang" className="border-b py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 md:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Diskusi komunitas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Tentang Kami
                </h3>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Sahabat Belajar adalah komunitas yang hadir untuk mendukung proses
                  belajar dan berbagi ilmu. Kami percaya bahwa setiap orang bisa
                  menjadi sahabat bagi orang lain dalam perjalanan belajar. Dengan
                  semangat gotong royong, kami menyelenggarakan kegiatan edukatif,
                  diskusi, dan event yang membangun serta menginspirasi.
                </p>
                <Link
                  href="/tentang-kami"
                  className="mt-6 inline-flex items-center text-primary font-medium hover:underline"
                >
                  Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Program - gambar besar kiri, kartu kanan */}
        <section id="program" className="border-b py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden lg:col-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"
                  alt="Program & Kegiatan Sahabat Belajar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="lg:col-span-3">
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Program & Kegiatan
                </h3>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4 rounded-xl border p-6 text-left">
                    <BookOpen className="h-10 w-10 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Artikel & Konten</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Artikel edukatif dan tips belajar untuk anggota dan masyarakat umum.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border p-6 text-left">
                    <Calendar className="h-10 w-10 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Event & Workshop</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Webinar, workshop, dan pertemuan rutin untuk belajar bersama.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border p-6 text-left">
                    <Library className="h-10 w-10 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Perpustakaan Keliling</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Layanan pinjam buku dan baca di lokasi untuk menjangkau masyarakat luas.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border p-6 text-left">
                    <Users className="h-10 w-10 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Komunitas</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Jaringan anggota dan kolaborasi dengan komunitas lain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pemateri & Narasumber */}
        <section id="pemateri" className="border-b bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Pemateri & Narasumber
                </h3>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                  Para pemateri dan narasumber yang berbagi ilmu dalam kegiatan Sahabat Belajar.
                </p>
              </div>
              <Link href="/pemateri">
                <Button variant="outline" className="rounded-full gap-2">
                  Selengkapnya →
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border bg-card overflow-hidden shadow-sm text-left">
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                    alt="Pemateri"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Nama Pemateri</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Pendidikan & Literasi</p>
                </div>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden shadow-sm text-left">
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                    alt="Pemateri"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Nama Pemateri</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Komunitas & Kolaborasi</p>
                </div>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden shadow-sm text-left">
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    alt="Pemateri"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Nama Pemateri</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Workshop & Pelatihan</p>
                </div>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden shadow-sm text-left">
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                    alt="Pemateri"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Nama Pemateri</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Event & Moderator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hubungi Kami - CTA utama WhatsApp, layout asimetris */}
        <section id="kontak" className="border-b bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Hubungi Kami
                </h3>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Ingin bergabung atau berkolaborasi? Kirim pesan ke kami lewat WhatsApp.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-white font-semibold shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl"
                >
                  <MessageCircle className="h-6 w-6" />
                  Chat via WhatsApp
                </a>
              </div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Kolaborasi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="mt-12 pt-8 border-t flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>Tulangan, Jawa Timur</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 md:px-8 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-6 text-sm">
              <Link href="/tentang-kami" className="text-muted-foreground hover:text-foreground">
                Tentang
              </Link>
              <a href="#program" className="text-muted-foreground hover:text-foreground">
                Program
              </a>
              <a href="#event" className="text-muted-foreground hover:text-foreground">
                Event
              </a>
              <a href="#pemateri" className="text-muted-foreground hover:text-foreground">
                Pemateri
              </a>
              <a href="#kontak" className="text-muted-foreground hover:text-foreground">
                Kontak
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
