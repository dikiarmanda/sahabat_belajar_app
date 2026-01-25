import { RegisterForm } from '@/components/features/auth/RegisterForm'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{APP_NAME}</h1>
        <p className="text-muted-foreground">Buat akun baru</p>
      </div>

      <RegisterForm />

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Sudah punya akun? </span>
        <Link href="/login" className="text-primary hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  )
}
