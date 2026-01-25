import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations/auth'
import { getUserByEmail } from '@/lib/db/queries'
import { verifyPassword } from '@/lib/auth/password'
import { createSession } from '@/lib/auth/session'
import { getUserById } from '@/lib/db/queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = loginSchema.parse(body)

    // Get user from database
    const user = await getUserByEmail(validated.email)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'Akun Anda telah dinonaktifkan' },
        { status: 403 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(validated.password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Create session
    const sessionUser = await getUserById(user.id)
    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: 'Gagal membuat session' },
        { status: 500 }
      )
    }

    await createSession(sessionUser)

    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: sessionUser,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Data tidak valid', details: error },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    )
  }
}
