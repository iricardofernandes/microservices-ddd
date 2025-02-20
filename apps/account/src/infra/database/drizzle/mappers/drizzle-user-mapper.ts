import { User } from '@/domain/enterprise/entities/user'

import { UniqueEntityID } from '@/core/unique-entity-id'
import { users } from '../schema'

export class DrizzleUserMapper {
  static toDomain(raw: typeof users.$inferSelect): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
    }
  }
}
