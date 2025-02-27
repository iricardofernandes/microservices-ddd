import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create Course Resolver (e2e)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('(Mutation) createCourse', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreateCourse($data: CreateCourseInput!) {
            createCourse(data: $data) {
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

    console.log(response.body)

    const {
      data: { createCourse: output },
    } = response.body

    expect(output).toMatchObject({
      id: expect.any(String),
      title: 'Course Example',
      slug: 'course-example',
    })
  })
})
