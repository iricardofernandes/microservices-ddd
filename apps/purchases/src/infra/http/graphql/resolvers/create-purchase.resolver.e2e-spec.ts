import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create Purchase Resolver (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createPurchase', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreatePurchase($data: CreatePurchaseInput!) {
            createPurchase(data: $data) {
              customer
            }
          }
        `,
        variables: {
          data: {
            customerId: 'customer-1',
            productId: 'product-1',
            status: 'APPROVED',
          },
        },
      })
      .expect(200)
  })
})
