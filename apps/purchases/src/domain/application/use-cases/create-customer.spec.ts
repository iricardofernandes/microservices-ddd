import { UniqueEntityID } from '@ms/core'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { CreateCustomerUseCase } from './create-customer'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()

    sut = new CreateCustomerUseCase(inMemoryCustomersRepository)
  })

  const authUserId = new UniqueEntityID().toString()

  it('should be able to create a customer', async () => {
    const result = await sut.execute({
      authUserId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      customer: inMemoryCustomersRepository.items[0],
    })
    expect(inMemoryCustomersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authUserId: authUserId,
        }),
      ])
    )
  })
})
