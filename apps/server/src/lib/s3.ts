import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { BUCKET_NAME } from './constants'

const client = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  },
})

const s3 = {
  async upload(key: string, Body: Buffer) {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body,
    })

    return await client.send(command)
  },

  async download(key: string) {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    try {
      const response = await client.send(command)

      if (response.Body) {
        const byteArray = await response.Body.transformToByteArray()
        return Buffer.from(byteArray)
      } else {
        return null
      }
    } catch (e) {
      console.error('Error downloading file:', e)
      return null
    }
  },
}

export default s3
