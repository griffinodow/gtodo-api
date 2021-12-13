import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { pool } from './lib/postgres'
import { HeartBeatResolver } from './resolvers/HeartBeatResolver'
import { UserResolver } from './resolvers/UserResolver'
import { ListResolver } from './resolvers/ListResolver'
import { TaskResolver } from './resolvers/TaskResolver'

(async () => {
  const app = express()
  app.use(cors())
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HeartBeatResolver, UserResolver, ListResolver, TaskResolver],
      validate: true,
      authChecker: async ({ context: { user } }: any) => {
        const client = await pool.connect()
        try {
          await client.query('BEGIN')
          const { rows } = await client.query('SELECT id FROM "user" WHERE id=$1 LIMIT 1', [user])
          await client.query('COMMIT')
          return rows.length === 1
        } catch {
          await client.query('ROLLBACK')
          return false
        } finally {
          client.release()
        }
      }
    }),
    context: ({ req, res }) => {
      const context = { req, res, user: null }
      if (!req.headers.authorization) return context
      const params = req.headers.authorization.split(' ')
      if (!params && !params[0] && params[0] !== 'Bearer' && !params[1]) return context
      return { req, res, user: params[1] }
    }
  })
  await apollo.start()
  apollo.applyMiddleware({ app, cors: false, path: '/' })
  app.listen({
    port: 4000
  }, () => console.log('Express server initialized'))
})()
