import { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { Customer } from '@/domain/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findByAuthUserID(authUserId: string) {
    const customer = this.items.find(item => item.authUserId === authUserId)

    if (!customer) {
      return null
    }

    return customer
  }

  async create(customer: Customer) {
    this.items.push(customer)
  }
}
