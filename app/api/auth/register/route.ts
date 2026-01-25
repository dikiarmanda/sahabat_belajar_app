import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations/auth'
import { getUserByEmail, getUserByUsername, createUser } from '@/lib/db/queries'
import { hashPassword } from '@/lib/auth/password'
import { createSession } from '@/lib/auth/session'
import { getUserById } from '@/lib/db/queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = registerSchema.parse(body)

    // Check if email already exists
    const existingEmail = await getUserByEmail(validated.email)
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingUsername = await getUserByUsername(validated.username)
    if (existingUsername) {
      return NextResponse.json(
        { success: false, error: 'Username sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validated.password)

    // Create user
    const newUser = await createUser({
      username: validated.username,
      email: validated.email,
      password: hashedPassword,
      fullName: validated.fullName,
      phone: validated.phone,
      address: validated.address,
      // Default role: Member (role_id = 3)
      roleId: 3,
    })

    // Create session
    const sessionUser = await getUserById(newUser.id)
    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: 'Gagal membuat session' },
        { status: 500 }
      )
    }

    await createSession(sessionUser)

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      user: sessionUser,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Data tidak valid', details: error },
        { status: 400 }
      )
    }

    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    )
  }
}
