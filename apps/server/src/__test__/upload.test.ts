import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import path from 'node:path'
import startServer from '../app'
import fileModel from '../models/file'
import fs from 'node:fs'
import { notifyUploader, notifyDownloader } from '../lib/email'
import s3 from '../lib/s3'

beforeEach(() => {
  vi.mock('../lib/s3')
  vi.mock('../lib/email')
  s3.upload = vi.fn()
  s3.download = vi.fn()
})

afterEach(() => {
  vi.clearAllMocks()
})

const app = startServer()

describe('POST /upload', () => {
  test('Handle when no files', async () => {
    const response = await request(app).post('/upload')
    expect(response.statusCode).toBe(500)
    expect(response.body.message).toBe('no file uploaded')
  })
  test('Handle when no body fields', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('fileUpload', path.resolve(__dirname, 'testScreenShoot.png'))
    expect(response.statusCode).toBe(500)
    expect(response.body.message).toBe('bad request')
  })

  test('Handle upload file', async () => {
    const emailTo = 'test@test.com'
    const yourEmail = 'test2@test.com'
    const title = 'testTitle'
    const message = 'testMessage'

    const response = await request(app)
      .post('/upload')
      .attach('fileUpload', path.resolve(__dirname, 'testScreenShoot.png'))
      .field({
        emailTo,
        yourEmail,
        title,
        message,
      })

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
    expect(notifyDownloader).toHaveBeenCalledTimes(1)
    expect(notifyUploader).toHaveBeenCalledTimes(1)

    expect(notifyDownloader).toHaveBeenCalledWith(
      uploadId.toString(),
      yourEmail,
      emailTo,
      title,
      message
    )

    expect(notifyUploader).toHaveBeenCalledWith(yourEmail, emailTo, 'File sent')

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
    expect(response.status).toBe(201)
  })
})

describe('GET /download', () => {
  test('Handle download file', async () => {
    const uploadId = 1
    const storagedFiles = await fileModel.findFiles(uploadId)

    let s3path
    if (storagedFiles) {
      s3path = storagedFiles[0].path
    }

    const pathServer = path.resolve(__dirname, 'testScreenShoot.png')
    const fileServer = fs.readFileSync(pathServer)

    s3.download = vi.fn().mockResolvedValue(fileServer)

    const response = await request(app).get(`/download/${uploadId}`)
    expect(s3.download).toBeCalledTimes(1)
    expect(s3.download).toBeCalledWith(s3path)
    expect(response.status).toBe(200)
  })
})
