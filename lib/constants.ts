export const APP_NAME = "Sahabat Belajar"
export const APP_DESCRIPTION = "Sistem Informasi Komunitas Sahabat Belajar"

export const ROLES = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  MEMBER: "Member",
  ACCOUNTANT: "Accountant",
} as const

export const ARTICLE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const

export const EVENT_STATUS = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  CANCELLED: "cancelled",
} as const

export const ATTENDANCE_STATUS = {
  REGISTERED: "registered",
  ATTENDED: "attended",
  ABSENT: "absent",
} as const

export const ACCOUNT_TYPES = {
  ASSET: "asset",
  LIABILITY: "liability",
  EQUITY: "equity",
  REVENUE: "revenue",
  EXPENSE: "expense",
} as const

export const NORMAL_BALANCE = {
  DEBIT: "debit",
  CREDIT: "credit",
} as const
