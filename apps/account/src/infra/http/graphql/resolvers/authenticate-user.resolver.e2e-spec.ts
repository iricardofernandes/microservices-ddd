import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { beforeAll } from 'vitest'

describe('Authenticate User Resolver (e2e)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  it('(Mutation) authenticateUser', async () => {
    await userFactory.makeDrizzleUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation AuthenticateUser($data: AuthenticateUserInput!) {
            authenticateUser(data: $data) {
              accessToken
            }
          }
        `,
        variables: {
          data: {
            email: 'johndoe@example.com',
            password: '123456',
          },
        },
      })
      .expect(200)

    const {
      data: { authenticateUser: output },
    } = response.body

    expect(output).toMatchObject({
      accessToken: expect.any(String),
    })
  })
})
