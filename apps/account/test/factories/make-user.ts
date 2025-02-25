import { UniqueEntityID } from '@/core/unique-entity-id'
import { User, UserProps } from '@/domain/enterprise/entities/user'
import { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { users } from '@/infra/database/drizzle/schema'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.drizzle.db.insert(users).values({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
    })

    return user
  }
}
