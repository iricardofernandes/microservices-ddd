import { Customer } from '@/domain/enterprise/entities/customer'

export abstract class CustomersRepository {
  abstract findByAuthUserID(authUserId: string): Promise<Customer | null>
  abstract create(customer: Customer): Promise<void>
}
