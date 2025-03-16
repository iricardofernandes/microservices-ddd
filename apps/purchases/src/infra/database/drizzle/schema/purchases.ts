import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const purchaseStatusEnum = pgEnum('purchase_status', [
  'PENDING',
  'APPROVED',
  'FAILED',
])

export const purchases = pgTable('purchases', {
  id: text('id').primaryKey(),
  customerId: text('customerId').notNull(),
  productId: text('productId').notNull(),
  status: purchaseStatusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
