import { CreateCustomerUseCase } from '@/domain/application/use-cases/create-customer'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateCustomerInput } from '../dto/input/create-customer.input'
import { CustomerModel } from '../dto/models/customer.model'

@Resolver()
export class CreateCustomerResolver {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Mutation(() => CustomerModel)
  async createCustomer(
    @Args('data') data: CreateCustomerInput
  ): Promise<CustomerModel> {
    const result = await this.createCustomerUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Customer with same auth user id already exists')
    }

    const { customer } = result.value

    return {
      id: customer.id.toString(),
      authUserId: customer.authUserId,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt ?? undefined,
    }
  }
}
