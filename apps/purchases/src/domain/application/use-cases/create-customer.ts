import { Either, left, right } from '@/core/either'
import { Customer } from '@/domain/enterprise/entities/customer'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { CustomerAlreadyExistsError } from './errors/customer-already-existis'

interface CreateCustomerUseCaseRequest {
  authUserId: string
}

type CreateCustomerUseCaseResponse = Either<
  CustomerAlreadyExistsError,
  {
    customer: Customer
  }
>

@Injectable()
export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    authUserId,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerWithAuthUserId =
      await this.customersRepository.findByAuthUserID(authUserId)

    if (customerWithAuthUserId) {
      return left(new CustomerAlreadyExistsError(authUserId))
    }

    const customer = Customer.create({
      authUserId,
    })

    await this.customersRepository.create(customer)

    return right({ customer })
  }
}
