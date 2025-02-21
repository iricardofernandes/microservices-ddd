import type { Config } from 'drizzle-kit'
import { loadEnvConfig } from './src/infra/env/env'

const env = loadEnvConfig()

export default {
  schema: './src/infra/database/drizzle/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  migrations: {
    schema: 'test:e2e',
  },
} satisfies Config
