import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HeartBeatResolver {
  @Query(() => String)
  heartbeat () {
    return 'online'
  }
}
