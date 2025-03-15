import { UniqueEntityID } from '@ms/core'
import { InMemoryPurchasesRepository } from 'test/repositories/in-memory-purchases-repository'
import { CreatePurchaseUseCase } from './create-purchase'

let inMemoryPurchasesRepository: InMemoryPurchasesRepository
let sut: CreatePurchaseUseCase

describe('Create Purchase', () => {
  beforeEach(() => {
    inMemoryPurchasesRepository = new InMemoryPurchasesRepository()

    sut = new CreatePurchaseUseCase(inMemoryPurchasesRepository)
  })

  it('should be able to create a purchase', async () => {
    const result = await sut.execute({
      customerId: new UniqueEntityID('customer-1').toString(),
      productId: new UniqueEntityID('product-1').toString(),
      status: 'APPROVED',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      purchase: inMemoryPurchasesRepository.items[0],
    })
    expect(inMemoryPurchasesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId: new UniqueEntityID('customer-1'),
          productId: new UniqueEntityID('product-1'),
          status: 'APPROVED',
        }),
      ])
    )
  })
})
