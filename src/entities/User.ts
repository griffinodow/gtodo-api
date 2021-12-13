import { Field, ObjectType } from 'type-graphql'
import { List } from './List'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field(() => [List])
  lists: List[]
}
