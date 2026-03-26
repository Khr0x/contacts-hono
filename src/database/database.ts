import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

export const client = postgres(connectionString, { 
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10 
})
export const db = drizzle(client);

export type DBTransaction = typeof db;