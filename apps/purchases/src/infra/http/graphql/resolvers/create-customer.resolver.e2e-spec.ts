import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { UniqueEntityID } from '@ms/core'

describe('Create Customer Resolver (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createCustomer', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreateCustomer($data: CreateCustomerInput!) {
            createCustomer(data: $data) {
              authUserId
            }
          }
        `,
        variables: {
          data: {
            authUserId: new UniqueEntityID().toString(),
          },
        },
      })
      .expect(200)
  })
})
