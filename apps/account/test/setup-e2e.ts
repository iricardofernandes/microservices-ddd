// import { randomUUID } from 'node:crypto'
import { config } from 'dotenv'
import { afterAll, beforeAll } from 'vitest'

config({ path: '.env', override: true })

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('search_path', schemaId)

  return url.toString()
}

// const schemaId = randomUUID()
// const databaseURL = generateUniqueDatabaseURL(schemaId)
// process.env.DATABASE_URL = databaseURL

beforeAll(async () => {})

afterAll(async () => {})
