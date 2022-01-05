import { ApolloError } from 'apollo-server-errors'
import { Mutation, Resolver, Arg, Ctx, Authorized, Query } from 'type-graphql'
import { List } from '../entities/List'
import { pool } from '../lib/postgres'

/**
 * API endpoint for lists.
 */
@Resolver()
export class ListResolver {
  @Authorized()
  @Mutation(() => List)
  async createList (@Ctx() context: any, @Arg('name') name: string, @Arg('uuid', { nullable: true }) uuid?: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      if (uuid) {
        const { rows } = await client.query('INSERT INTO list ("user", name, "uuid") VALUES ($1, $2, $3) RETURNING "user", name, uuid', [context.user, name, uuid])
        await client.query('COMMIT')
        return rows[0]
      } else {
        const { rows } = await client.query('INSERT INTO list ("user", name) VALUES ($1, $2) RETURNING "user", name, uuid', [context.user, name])
        await client.query('COMMIT')
        return rows[0]
      }
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'LIST_CREATE_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Query(() => [List], { nullable: true })
  async lists (@Ctx() context: any) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      let { rows } = await client.query('SELECT "uuid", name FROM list WHERE "user"=$1', [context.user])
      rows = rows.map(async (list) => {
        const { rows: tasks } = await client.query('SELECT task."uuid", task.name, task.complete FROM task LEFT JOIN list ON list.uuid=task.list WHERE task.list=$2 AND list.user=$1 ORDER BY list.created_at ASC', [context.user, list.uuid])
        list.tasks = tasks
        return list
      })
      await client.query('COMMIT')
      return rows
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'LIST_GET_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Mutation(() => List, { nullable: true })
  async updateList (@Ctx() context: any, @Arg('uuid') uuid: string, @Arg('name') name: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('UPDATE list SET name=$3 WHERE "user"=$1 AND "uuid"=$2 RETURNING "uuid", name', [context.user, uuid, name])
      await client.query('COMMIT')
      return rows[0]
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'LIST_GET_FAIL')
    } finally {
      client.release()
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteList (@Ctx() context: any, @Arg('uuid') uuid: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM list WHERE "user"=$1 AND "uuid"=$2', [context.user, uuid])
      await client.query('COMMIT')
      return true
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'LIST_GET_FAIL')
    } finally {
      client.release()
    }
  }
}
