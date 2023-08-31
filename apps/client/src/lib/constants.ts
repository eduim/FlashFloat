import dotenv from 'dotenv'
dotenv.config()

if (!process.env.server) {
  throw new Error('missing SERVER in .env file')
}

export const server = process.env.SERVER

