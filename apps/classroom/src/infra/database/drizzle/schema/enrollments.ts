import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const enrollments = pgTable('enrollments', {
  id: text('id').primaryKey(),
  studentId: text('student_id').notNull(),
  courseId: text('courseId').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
