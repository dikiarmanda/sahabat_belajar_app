import { z } from "zod"

export type UserRole = "Admin" | "Editor" | "Member" | "Accountant"
export type ArticleStatus = "draft" | "published" | "archived"
export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled"
export type PaymentStatus = "pending" | "paid" | "cancelled"
export type AttendanceStatus = "registered" | "attended" | "absent"
export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense"
export type NormalBalance = "debit" | "credit"

export interface SessionUser {
  id: number
  username: string
  email: string
  full_name: string
  role_id: number | null
  role_name: string | null
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: SessionUser
  error?: string
}
