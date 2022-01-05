import { Field, ObjectType } from 'type-graphql'

/**
 * A task in a list.
 */
@ObjectType()
export class Task {
  @Field()
  uuid: string

  @Field()
  name: string

  @Field()
  complete: boolean
}
