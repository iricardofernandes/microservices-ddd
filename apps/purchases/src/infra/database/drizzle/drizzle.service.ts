import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private client: postgres.Sql
  public db: ReturnType<typeof drizzle>

  constructor(env: EnvService) {
    this.client = postgres(env.get('DATABASE_URL'))
    this.db = drizzle(this.client, { schema })
  }

  async onModuleInit() {
    await this.client`SELECT 1`
  }

  async onModuleDestroy() {
    await this.client.end()
  }
}
