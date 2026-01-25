import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50, 'Username maksimal 50 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter').max(100, 'Nama lengkap maksimal 100 karakter'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
