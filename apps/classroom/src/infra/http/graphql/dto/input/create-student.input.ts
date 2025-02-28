import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateStudentInput {
  @Field()
  authUserId: string
}
