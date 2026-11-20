import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('MONGODB_URI is not defined')
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient
  mongoClientPromise?: Promise<MongoClient>
}

const client = globalForMongo.mongoClient ?? new MongoClient(uri)

if (!globalForMongo.mongoClientPromise) {
  globalForMongo.mongoClientPromise = client.connect()
}

globalForMongo.mongoClient = client

const clientPromise = globalForMongo.mongoClientPromise

export { client, clientPromise }

export const db = client.db('rentora')
