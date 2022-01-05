import { Query, Resolver } from 'type-graphql'

/**
 * Resolver for checking online status of API.
 */
@Resolver()
export class HeartBeatResolver {
  @Query(() => String)
  heartbeat () {
    return 'online'
  }
}
