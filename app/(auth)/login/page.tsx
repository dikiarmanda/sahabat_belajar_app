import { LoginForm } from '@/components/features/auth/LoginForm'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function LoginPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{APP_NAME}</h1>
        <p className="text-muted-foreground">Masuk ke akun Anda</p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Belum punya akun? </span>
        <Link href="/register" className="text-primary hover:underline">
          Daftar sekarang
        </Link>
      </div>
    </div>
  )
}
