import { Field, ObjectType } from 'type-graphql'
import { Task } from './Task'

@ObjectType()
export class List {
  @Field()
  uuid: string

  @Field()
  name: string

  @Field(() => [Task])
  tasks: Task[]
}
