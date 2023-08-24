import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { BUCKET_NAME } from './constants'

const client = new S3Client({})

const s3 = {
  async upload(key: string, Body: Buffer) {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body,
    })

    return await client.send(command)
  },
}

export default s3
