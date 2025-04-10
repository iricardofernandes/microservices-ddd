import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EnrollmentModel {
  @Field(() => ID)
  id: string

  @Field()
  studentId: string

  @Field()
  courseId: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
