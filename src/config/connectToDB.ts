import mongoose, { Connection } from 'mongoose'

let cachedDB: Connection | null = null

// This is a singleton pattern to avoid re-establishing connections
// every time a request is made (helpful during hot-reloading in development)
const connectToDB = async (url: string): Promise<Connection> => {
  if (cachedDB) return cachedDB

  try {
    const DB = await mongoose.connect(url)

    cachedDB = DB.connection
    console.log('Connected to MongoDB successfully!')
    return cachedDB
  } catch (error) {
    console.error('MongoDB connection error: ', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectToDB
