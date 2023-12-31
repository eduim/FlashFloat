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

if (!process.env.BUCKET_NAME) {
  throw new Error('missing BUCKET_NAME .env file')
}

export const BUCKET_NAME = process.env.BUCKET_NAME

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION
) {
  throw new Error(
    'missing AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION in .env file'
  )
}

if (!process.env.CLIENT) {
  throw new Error('missing CLIENT in .env file')
}

export const client = process.env.CLIENT
