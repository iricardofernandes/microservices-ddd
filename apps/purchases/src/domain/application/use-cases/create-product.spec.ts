import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a product', async () => {
    const result = await sut.execute({
      title: 'Nodejs Course',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      product: inMemoryProductsRepository.items[0],
    })
    expect(inMemoryProductsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Nodejs Course',
          slug: expect.objectContaining({
            value: 'nodejs-course',
          }),
        }),
      ])
    )
  })
})
