import { Field, ObjectType } from 'type-graphql'
import { List } from './List'

/**
 * A user.
 */
@ObjectType()
export class User {
  @Field()
  id: string

  @Field(() => [List])
  lists: List[]
}
