import { Mutation, Query, Resolver, Arg } from 'type-graphql'
import { ApolloError } from 'apollo-server-errors'
import { User } from '../entities/User'
import { pool } from '../lib/postgres'

/**
 * API endpoint for users.
 */
@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser () {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let id = ''
    for (let i = 0; i < 6; i++) {
      id += Math.floor(Math.random() * (2 - 0)) ? letters[Math.floor(Math.random() * (26 - 0))] : Math.floor(Math.random() * (10 - 0))
    }
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query('INSERT INTO "user" (id) VALUES ($1)', [id])
      await client.query('COMMIT')
      return {
        id
      }
    } catch (error) {
      console.error(error)
      await client.query('ROLLBACK')
      throw new ApolloError('User could not be created', 'USER_CREATE_FAIL')
    } finally {
      client.release()
    }
  }

  @Query(() => User, { nullable: true })
  async user (@Arg('id') id: string) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('SELECT id FROM "user" WHERE id=$1 LIMIT 1', [id])
      await client.query('COMMIT')
      return rows.length > 0 ? { id: rows[0]?.id } : null
    } catch {
      await client.query('ROLLBACK')
      throw new ApolloError('Internal server error', 'QUERY ERROR')
    } finally {
      client.release()
    }
  }
}
