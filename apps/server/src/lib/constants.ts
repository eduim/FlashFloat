import dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
  throw new Error('missing PORT in .env file')
}

export const PORT = process.env.PORT

if (!process.env.DATABASE_URL) {
  throw new Error('missing DATABASE_URL in .env file')
}

export const DATABASE_URL = process.env.DATABASE_URL
