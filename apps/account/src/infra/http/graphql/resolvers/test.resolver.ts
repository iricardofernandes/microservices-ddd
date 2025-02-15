import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class TestResolver {
  @Query(() => String)
  hello() {
    return 'Hello World'
  }
}
