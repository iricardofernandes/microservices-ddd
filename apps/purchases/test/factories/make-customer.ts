import { UniqueEntityID } from '@/core/unique-entity-id'
import { Customer, CustomerProps } from '@/domain/enterprise/entities/customer'
import { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { customers } from '@/infra/database/drizzle/schema'
import { Injectable } from '@nestjs/common'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityID
) {
  const customer = Customer.create(
    {
      authUserId: new UniqueEntityID().toString(),
      ...override,
    },
    id
  )

  return customer
}

@Injectable()
export class CustomerFactory {
  constructor(private drizzle: DrizzleService) {}

  async makeDrizzleCustomer(
    data: Partial<CustomerProps> = {}
  ): Promise<Customer> {
    const customer = makeCustomer(data)

    await this.drizzle.db.insert(customers).values({
      id: customer.id.toString(),
      authUserId: customer.authUserId,
      createdAt: new Date(),
    })

    return customer
  }
}
