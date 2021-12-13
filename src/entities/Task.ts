import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Task {
  @Field()
  uuid: string

  @Field()
  name: string

  @Field()
  complete: boolean
}
