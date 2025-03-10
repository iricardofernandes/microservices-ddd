import { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { Customer } from '@/domain/enterprise/entities/customer'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle.service'
import { DrizzleCustomerMapper } from '../mappers/drizzle-customer-mapper'
import { customers } from '../schema'

@Injectable()
export class DrizzleCustomersRepository implements CustomersRepository {
  constructor(private drizzle: DrizzleService) {}

  async findByAuthUserID(authUserId: string): Promise<Customer | null> {
    const result = await this.drizzle.db
      .select()
      .from(customers)
      .where(eq(customers.authUserId, authUserId))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return DrizzleCustomerMapper.toDomain(result[0])
  }

  async create(customer: Customer): Promise<void> {
    const data = DrizzleCustomerMapper.toPersistence(customer)

    await this.drizzle.db.insert(customers).values(data)
  }
}
