import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { UniqueEntityID } from '@ms/core'

describe('Create Student Resolver (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createStudent', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreateStudent($data: CreateStudentInput!) {
            createStudent(data: $data) {
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

    const {
      data: { createStudent: output },
    } = response.body

    expect(output).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
  })
})
