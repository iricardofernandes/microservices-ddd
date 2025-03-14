import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Purchase } from '@/domain/enterprise/entities/purchase'
import { Injectable } from '@nestjs/common'
import { PurchasesRepository } from '../repositories/purchases-repository'

interface CreatePurchaseUseCaseRequest {
  customerId: string
  productId: string
  status: 'PENDING' | 'APPROVED' | 'FAILED'
}

type CreatePurchaseUseCaseResponse = Either<
  null,
  {
    purchase: Purchase
  }
>

@Injectable()
export class CreatePurchaseUseCase {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute({
    customerId,
    productId,
    status,
  }: CreatePurchaseUseCaseRequest): Promise<CreatePurchaseUseCaseResponse> {
    const purchase = Purchase.create({
      customerId: new UniqueEntityID(customerId),
      productId: new UniqueEntityID(productId),
      status,
    })

    await this.purchasesRepository.create(purchase)

    return right({ purchase })
  }
}
