import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { UniqueEntityID } from '@ms/core'

describe('Create Enrollment Resolver (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createEnrollment', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreateEnrollment($data: CreateEnrollmentInput!) {
            createEnrollment(data: $data) {
              studentId
              courseId
            }
          }
        `,
        variables: {
          data: {
            studentId: new UniqueEntityID().toString(),
            courseId: new UniqueEntityID().toString(),
          },
        },
      })
      .expect(200)

    const {
      data: { createEnrollment: output },
    } = response.body

    expect(output).toMatchObject({
      id: expect.any(String),
      studentId: expect.any(String),
      courseId: expect.any(String),
    })
  })
})
