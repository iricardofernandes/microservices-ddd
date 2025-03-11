import { UniqueEntityID } from '@/core/unique-entity-id'
import { Customer } from '@/domain/enterprise/entities/customer'
import { customers } from '../schema'

export class DrizzleCustomerMapper {
  static toDomain(raw: typeof customers.$inferSelect): Customer {
    return Customer.create(
      {
        authUserId: raw.authUserId,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(customer: Customer) {
    return {
      id: customer.id.toString(),
      authUserId: customer.authUserId,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt ?? undefined,
    }
  }
}
