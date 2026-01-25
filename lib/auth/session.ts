import { cookies } from 'next/headers'
import { SessionUser } from '@/types'

const SESSION_COOKIE_NAME = 'sb_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function createSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies()
  const sessionData = JSON.stringify(user)
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as SessionUser
  } catch {
    return null
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
