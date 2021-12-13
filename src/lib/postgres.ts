import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env.GT_PG_USER,
  host: process.env.GT_PG_HOST,
  database: process.env.GT_PG_DB,
  password: process.env.GT_PG_PW,
  port: process.env.GT_PG_PORT as number | undefined
})
