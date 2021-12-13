import { ApolloError } from 'apollo-server-errors'
import { Mutation, Resolver, Arg, Ctx, Authorized, Query } from 'type-graphql'
import { Task } from '../entities/Task'
import { pool } from '../lib/postgres'

@Resolver()
export class TaskResolver {
  @Authorized()
  @Mutation(() => Task)
  async createTask (@Ctx() context: any, @Arg('list') list: string, @Arg('name') name: string, @Arg('complete') complete: boolean, @Arg('uuid', { nullable: true }) uuid?: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('SELECT "user", "uuid" FROM list WHERE "user"=$1 AND "uuid"=$2', [context.user, list])
      if (!rows[0]) throw new ApolloError('Bad request', 'LIST_DOES_NOT_EXIST')
      if (uuid) {
        const { rows } = await client.query('INSERT INTO task (list, name, complete, "uuid") VALUES ($1, $2, $3, $4) RETURNING list, name, complete, "uuid"', [list, name, complete, uuid])
        await client.query('COMMIT')
        return rows[0]
      } else {
        const { rows } = await client.query('INSERT INTO task (list, name, complete) VALUES ($1, $2, $3) RETURNING list, name, complete, "uuid"', [list, name, complete])
        await client.query('COMMIT')
        return rows[0]
      }
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'TASK_CREATE_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Query(() => Task)
  async tasks (@Ctx() context: any, @Arg('list') list: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('SELECT task.uuid, task.name, task.complete FROM task LEFT JOIN list ON list.uuid=task.list WHERE "user"=$1 AND list.uuid=$2 ORDER BY task.created_at ASC', [context.user, list])
      await client.query('COMMIT')
      return rows[0]
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'TASK_GET_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Mutation(() => Task)
  async updateTask (@Ctx() context: any, @Arg('uuid') uuid: string, @Arg('name') name: string, @Arg('complete') complete: boolean) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('UPDATE task SET "name"=$3, complete=$4 FROM list WHERE list.uuid=task.list AND list.user=$1 AND list.uuid=task.list AND task.uuid=$2 RETURNING task.uuid, task.name, task.complete', [context.user, uuid, name, complete])
      await client.query('COMMIT')
      return rows[0]
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'TASK_UPDATE_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteTask (@Ctx() context: any, @Arg('uuid') uuid: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM task USING list WHERE task.list=list.uuid AND list.user=$1 AND task.uuid=$2', [context.user, uuid])
      await client.query('COMMIT')
      return true
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'TASK_DELETE_FAIL')
    } finally {
      client.release()
    }
  }
}
