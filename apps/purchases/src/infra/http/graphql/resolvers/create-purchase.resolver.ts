import { CreatePurchaseUseCase } from '@/domain/application/use-cases/create-purchase'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreatePurchaseInput } from '../dto/input/create-purchase.input'
import { PurchaseModel } from '../dto/models/purchase.model'

@Resolver()
export class CreatePurchaseResolver {
  constructor(private createPurchaseUseCase: CreatePurchaseUseCase) {}

  @Mutation(() => PurchaseModel)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput
  ): Promise<PurchaseModel> {
    const result = await this.createPurchaseUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Purchase with same slug already exists')
    }

    const { purchase } = result.value

    return {
      id: purchase.id.toString(),
      customerId: purchase.customerId.toString(),
      productId: purchase.productId.toString(),
      status: purchase.status,
      createdAt: purchase.createdAt,
      updatedAt: purchase.updatedAt ?? undefined,
    }
  }
}
