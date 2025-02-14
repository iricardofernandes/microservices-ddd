import type { Config } from 'drizzle-kit'
import { env } from './src/infra/env/env'

export default {
  schema: './src/infra/database/drizzle/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
