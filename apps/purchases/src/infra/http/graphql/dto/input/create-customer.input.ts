import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCustomerInput {
  @Field()
  authUserId: string
}
