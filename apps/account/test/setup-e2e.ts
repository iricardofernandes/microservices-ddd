import { execSync } from 'node:child_process'
import { config } from 'dotenv'
import postgres from 'postgres'
import { afterAll, beforeAll } from 'vitest'

config({ path: '.env', override: true })

function generateUniqueDatabaseURL() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('search_path', 'test:e2e')

  return url.toString()
}

const databaseURL = generateUniqueDatabaseURL()
process.env.DATABASE_URL = databaseURL

const sql = postgres(databaseURL)

beforeAll(async () => {
  await sql.unsafe('CREATE SCHEMA "test:e2e"')

  execSync('pnpm drizzle-kit migrate --config=drizzle-test.config.ts')
})

afterAll(async () => {
  await sql.unsafe('DROP SCHEMA IF EXISTS "test:e2e" CASCADE')
  await sql.end()
})
