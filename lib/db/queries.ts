import { db } from './index'
import { users, roles } from './schema'
import { eq } from 'drizzle-orm'
import type { SessionUser } from '@/types'

export async function getUserByEmail(email: string) {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      fullName: users.fullName,
      phone: users.phone,
      address: users.address,
      roleId: users.roleId,
      profilePhoto: users.profilePhoto,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: {
        id: roles.id,
        roleName: roles.roleName,
        description: roles.description,
      },
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.email, email))
    .limit(1)

  return result[0] || null
}

export async function getUserByUsername(username: string) {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      fullName: users.fullName,
      phone: users.phone,
      address: users.address,
      roleId: users.roleId,
      profilePhoto: users.profilePhoto,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: {
        id: roles.id,
        roleName: roles.roleName,
        description: roles.description,
      },
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.username, username))
    .limit(1)

  return result[0] || null
}

export async function getUserById(id: number): Promise<SessionUser | null> {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      fullName: users.fullName,
      roleId: users.roleId,
      roleName: roles.roleName,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.id, id))
    .limit(1)

  if (!result[0]) return null

  return {
    id: result[0].id,
    username: result[0].username,
    email: result[0].email,
    full_name: result[0].fullName,
    role_id: result[0].roleId,
    role_name: result[0].roleName || null,
  } as SessionUser
}

export async function createUser(data: {
  username: string
  email: string
  password: string
  fullName: string
  phone?: string
  address?: string
  roleId?: number
}) {
  const result = await db
    .insert(users)
    .values({
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      roleId: data.roleId,
    })
    .returning()

  return result[0]
}
