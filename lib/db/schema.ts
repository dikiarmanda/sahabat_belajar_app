import { pgTable, serial, varchar, text, integer, boolean, timestamp, decimal, date, pgEnum, unique, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const articleStatusEnum = pgEnum('article_status', ['draft', 'published', 'archived'])
export const eventStatusEnum = pgEnum('event_status', ['upcoming', 'ongoing', 'completed', 'cancelled'])
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'cancelled'])
export const attendanceStatusEnum = pgEnum('attendance_status', ['registered', 'attended', 'absent'])
export const accountTypeEnum = pgEnum('account_type', ['asset', 'liability', 'equity', 'revenue', 'expense'])
export const normalBalanceEnum = pgEnum('normal_balance', ['debit', 'credit'])

// ====================================
// USER MANAGEMENT TABLES
// ====================================

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  roleName: varchar('role_name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  roleId: integer('role_id').references(() => roles.id, { onDelete: 'set null' }),
  profilePhoto: varchar('profile_photo', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ====================================
// ARTICLE TABLES
// ====================================

export const articleCategories = pgTable('article_categories', {
  id: serial('id').primaryKey(),
  categoryName: varchar('category_name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: varchar('featured_image', { length: 255 }),
  authorId: integer('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => articleCategories.id, { onDelete: 'set null' }),
  status: articleStatusEnum('status').default('draft'),
  views: integer('views').default(0),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const articleTags = pgTable('article_tags', {
  id: serial('id').primaryKey(),
  tagName: varchar('tag_name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const articleTagRelations = pgTable('article_tag_relations', {
  articleId: integer('article_id').notNull().references(() => articles.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => articleTags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.tagId] }),
}))

// ====================================
// EVENT TABLES
// ====================================

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  eventName: varchar('event_name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  location: varchar('location', { length: 255 }),
  maxParticipants: integer('max_participants'),
  registrationFee: decimal('registration_fee', { precision: 15, scale: 2 }).default('0'),
  posterImage: varchar('poster_image', { length: 255 }),
  organizerId: integer('organizer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: eventStatusEnum('status').default('upcoming'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const eventRegistrations = pgTable('event_registrations', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  registrationDate: timestamp('registration_date', { withTimezone: true }).defaultNow(),
  paymentStatus: paymentStatusEnum('payment_status').default('pending'),
  paymentDate: timestamp('payment_date', { withTimezone: true }),
  attendanceStatus: attendanceStatusEnum('attendance_status').default('registered'),
  notes: text('notes'),
}, (table) => ({
  uniqueEventUser: unique('event_user_unique').on(table.eventId, table.userId),
}))

// ====================================
// ACCOUNTING TABLES
// ====================================

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  accountCode: varchar('account_code', { length: 20 }).notNull().unique(),
  accountName: varchar('account_name', { length: 100 }).notNull(),
  accountType: accountTypeEnum('account_type').notNull(),
  parentId: integer('parent_id'),
  normalBalance: normalBalanceEnum('normal_balance').notNull(),
  isActive: boolean('is_active').default(true),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const generalJournals = pgTable('general_journals', {
  id: serial('id').primaryKey(),
  journalNumber: varchar('journal_number', { length: 50 }).notNull().unique(),
  transactionDate: date('transaction_date').notNull(),
  description: text('description').notNull(),
  reference: varchar('reference', { length: 100 }),
  createdBy: integer('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPosted: boolean('is_posted').default(false),
  isReversed: boolean('is_reversed').default(false),
  reversedJournalId: integer('reversed_journal_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const journalDetails = pgTable('journal_details', {
  id: serial('id').primaryKey(),
  journalId: integer('journal_id').notNull().references(() => generalJournals.id, { onDelete: 'cascade' }),
  accountId: integer('account_id').notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  debit: decimal('debit', { precision: 15, scale: 2 }).default('0'),
  credit: decimal('credit', { precision: 15, scale: 2 }).default('0'),
  description: text('description'),
})

export const ledgers = pgTable('ledgers', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  journalDetailId: integer('journal_detail_id').notNull().references(() => journalDetails.id, { onDelete: 'cascade' }),
  transactionDate: date('transaction_date').notNull(),
  description: text('description'),
  debit: decimal('debit', { precision: 15, scale: 2 }).default('0'),
  credit: decimal('credit', { precision: 15, scale: 2 }).default('0'),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const accountingPeriods = pgTable('accounting_periods', {
  id: serial('id').primaryKey(),
  periodName: varchar('period_name', { length: 50 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  isClosed: boolean('is_closed').default(false),
  closedAt: timestamp('closed_at', { withTimezone: true }),
  closedBy: integer('closed_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ====================================
// RELATIONS
// ====================================

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  articles: many(articles),
  events: many(events),
  eventRegistrations: many(eventRegistrations),
  journals: many(generalJournals),
}))

export const articleCategoriesRelations = relations(articleCategories, ({ many }) => ({
  articles: many(articles),
}))

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  category: one(articleCategories, {
    fields: [articles.categoryId],
    references: [articleCategories.id],
  }),
  tagRelations: many(articleTagRelations),
}))

export const articleTagsRelations = relations(articleTags, ({ many }) => ({
  articleRelations: many(articleTagRelations),
}))

export const articleTagRelationsRelations = relations(articleTagRelations, ({ one }) => ({
  article: one(articles, {
    fields: [articleTagRelations.articleId],
    references: [articles.id],
  }),
  tag: one(articleTags, {
    fields: [articleTagRelations.tagId],
    references: [articleTags.id],
  }),
}))

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  registrations: many(eventRegistrations),
}))

export const eventRegistrationsRelations = relations(eventRegistrations, ({ one }) => ({
  event: one(events, {
    fields: [eventRegistrations.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [eventRegistrations.userId],
    references: [users.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  parent: one(accounts, {
    fields: [accounts.parentId],
    references: [accounts.id],
  }),
  children: many(accounts),
  journalDetails: many(journalDetails),
  ledgers: many(ledgers),
}))

export const generalJournalsRelations = relations(generalJournals, ({ one, many }) => ({
  creator: one(users, {
    fields: [generalJournals.createdBy],
    references: [users.id],
  }),
  details: many(journalDetails),
  reversedJournal: one(generalJournals, {
    fields: [generalJournals.reversedJournalId],
    references: [generalJournals.id],
  }),
}))

export const journalDetailsRelations = relations(journalDetails, ({ one, many }) => ({
  journal: one(generalJournals, {
    fields: [journalDetails.journalId],
    references: [generalJournals.id],
  }),
  account: one(accounts, {
    fields: [journalDetails.accountId],
    references: [accounts.id],
  }),
  ledgers: many(ledgers),
}))

export const ledgersRelations = relations(ledgers, ({ one }) => ({
  account: one(accounts, {
    fields: [ledgers.accountId],
    references: [accounts.id],
  }),
  journalDetail: one(journalDetails, {
    fields: [ledgers.journalDetailId],
    references: [journalDetails.id],
  }),
}))
