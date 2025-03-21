import dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
  throw new Error('PORT is not defined in the environment variables.')
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.')
}

if (!process.env.JWT_LIFETIME) {
  throw new Error('JWT_LIFETIME is not defined in the environment variables.')
}
if (!process.env.MONGODB_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables.')
}

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_LIFETIME = process.env.JWT_LIFETIME
export const MONGODB_URI = process.env.MONGODB_URI
