import { CreateProductUseCase } from '@/domain/application/use-cases/create-product'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateProductInput } from '../dto/input/create-product.input'
import { ProductModel } from '../dto/models/product.model'

@Resolver()
export class CreateProductResolver {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Mutation(() => ProductModel)
  async createProduct(
    @Args('data') data: CreateProductInput
  ): Promise<ProductModel> {
    const result = await this.createProductUseCase.execute(data)

    if (result.isLeft()) {
      throw new GraphQLError('Product with same slug already exists')
    }

    const { product } = result.value

    return {
      id: product.id.toString(),
      title: product.title,
      slug: product.slug.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? undefined,
    }
  }
}
