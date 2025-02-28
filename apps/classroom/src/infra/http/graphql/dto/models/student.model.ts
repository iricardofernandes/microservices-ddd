import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentModel {
  @Field(() => ID)
  id: string

  @Field()
  authUserId: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
