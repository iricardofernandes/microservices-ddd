import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const students = pgTable('students', {
  id: text('id').primaryKey(),
  authUserId: text('auth_user_id').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
