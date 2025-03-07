import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create Product Resolver (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createProduct', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreateProduct($data: CreateProductInput!) {
            createProduct(data: $data) {
              title
            }
          }
        `,
        variables: {
          data: {
            title: 'Course Example',
          },
        },
      })
      .expect(200)

    const {
      data: { createProduct: output },
    } = response.body

    expect(output).toMatchObject({
      title: 'Course Example',
      slug: 'course-example',
    })
  })
})
