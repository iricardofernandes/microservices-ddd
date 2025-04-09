import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEnrollmentInput {
  @Field()
  studentId: string

  @Field()
  courseId: string
}
