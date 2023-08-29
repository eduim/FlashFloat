import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import path from 'node:path'
import startServer from '../app'
import fileModel from '../models/file'
import fs from 'node:fs'
import { notifyUploader, notifyDownloader } from '../lib/email'
import s3 from '../lib/s3'

const app = startServer()

beforeEach(() => {
  vi.mock('../lib/s3')
  vi.mock('../lib/email')

  s3.upload = vi.fn()
  s3.download = vi.fn()
})

afterEach(() => {
  vi.clearAllMocks()
})

test('POST /upload', async () => {
  const emailTo = 'test@test.com'
  const yourEmail = 'test2@test.com'
  const title = 'testTitle'
  const message = 'testMessage'

  const response = await request(app)
    .post('/upload')
    .field('emailTo', emailTo)
    .field('yourEmail', yourEmail)
    .field('title', title)
    .field('message', message)
    .attach('fileUpload', path.resolve(__dirname, 'testScreenShoot.png'))

  const uploadId = response.body.updateUPload.id
  const files = await fileModel.findFiles(uploadId)

  if (files) {
    files.forEach((file) => {
      expect(file).toMatchObject({
        id: expect.any(Number),
        uploadedAt: expect.any(Date),
        fileName: 'testScreenShoot.png',
        size: expect.any(Number),
        typeOfFile: 'image/png',
        path: expect.any(String),
        uploadId: uploadId,
      })
    })
  }
  expect(s3.upload).toHaveBeenCalledTimes(1)
  expect(notifyUploader).toHaveBeenCalledTimes(1)
  expect(notifyDownloader).toHaveBeenCalledWith(
    uploadId.toString(),
    yourEmail,
    emailTo,
    title,
    message
  )
  expect(notifyUploader).toBeCalledWith(yourEmail, emailTo, 'File sent')
  expect(notifyDownloader).toHaveBeenCalledTimes(1)

  expect(response.status).toBe(201)
  expect(response.body).toMatchObject({
    updateUPload: {
      id: expect.any(Number),
      uploadedAt: expect.any(String),
      title,
      message,
      expiresAt: expect.any(String),
      uploaderId: expect.any(Number),
      downloaderId: expect.any(Number),
    },
  })
})

test('GET /download/:uploadId', async () => {
  const uploadId = 1
  const storagedFiles = await fileModel.findFiles(uploadId)
  let s3Path

  if (storagedFiles) {
    s3Path = storagedFiles[0].path
  }
  const fileServer = path.resolve(__dirname, 'testScreenShoot.png')
  const fileContentServer = fs.readFileSync(fileServer)
  const fileBufferServer = Buffer.from(fileContentServer)

  s3.download = vi.fn().mockResolvedValueOnce(fileBufferServer)

  const response = await request(app).get(`/download/${uploadId}`)

  expect(s3.download).toBeCalledTimes(1)
  expect(s3.download).toBeCalledWith(s3Path)
  expect(response.status).toBe(200)
})
