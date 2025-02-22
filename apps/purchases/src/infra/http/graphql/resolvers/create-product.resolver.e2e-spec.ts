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

  it('(Mutation) registerUser', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation RegisterUser($data: RegisterUserInput!) {
            registerUser(data: $data) {
              id
              name
              email
              createdAt
            }
          }
        `,
        variables: {
          data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
          },
        },
      })
      .expect(200)

    const {
      data: { registerUser: output },
    } = response.body

    expect(output).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
  })
})
