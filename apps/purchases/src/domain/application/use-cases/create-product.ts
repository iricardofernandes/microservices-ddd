import { Either, left, right } from '@/core/either'
import { Product } from '@/domain/enterprise/entities/product'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../repositories/products-repository'
import { ProductAlreadyExistsError } from './errors/product-already-existis'

interface CreateProductUseCaseRequest {
  title: string
}

type CreateProductUseCaseResponse = Either<
  ProductAlreadyExistsError,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    title,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const slug = Slug.createFromText(title).toString()
    const productWithSameSlug = await this.productsRepository.findBySlug(slug)

    if (productWithSameSlug) {
      return left(new ProductAlreadyExistsError(slug))
    }

    const product = Product.create({
      title,
    })

    await this.productsRepository.create(product)

    return right({ product })
  }
}
