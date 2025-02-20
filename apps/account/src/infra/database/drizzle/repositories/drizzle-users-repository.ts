import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle.service'
import { DrizzleUserMapper } from '../mappers/drizzle-user-mapper'
import { users } from '../schema'

@Injectable()
export class DrizzleUsersRepository implements UsersRepository {
  constructor(private drizzle: DrizzleService) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return DrizzleUserMapper.toDomain(result[0])
  }

  async create(user: User): Promise<void> {
    const data = DrizzleUserMapper.toPersistence(user)

    await this.drizzle.db.insert(users).values(data)
  }
}
