import { expect, test } from 'vitest'
import path from 'node:path'
import fs from 'fs'
import startServer from '../app'
import request from 'supertest'
import prisma from '../lib/prisma'

const app = startServer()

test('GET /', async () => {
  const response = await request(app).get('/')
  expect(response.status).toBe(200)
  expect(response.body).toBe('hello')
})

test('POST /upload', async () => {
  const emailTo = 'test@test.com'
  const yourEmail = 'test2@test.com'
  const title = 'title'
  const message = 'message'

  const response = await request(app)
    .post('/upload')
    .field('emailTo', emailTo)
    .field('yourEmail', yourEmail)
    .field('title', title)
    .field('message', message)
    .attach('fileUpload', path.resolve(__dirname, 'testScreenShoot.png'))

  const uploadId = response.body.upload.id

  const file = await prisma.file.findUnique({
    where: {
      id: uploadId,
    },
  })

  if (file) {
    fs.unlinkSync(file.path)
  }

  console.log(response.body)
  expect(response.status).toBe(201)
  expect(response.body).toMatchObject({
    upload: {
      id: uploadId,
      uploadedAt: expect.any(String),
      title: title,
      message: message,
      expiresAt: expect.any(String),
      uploaderId: expect.any(Number),
      downloaderId: expect.any(Number),
    },
  })
})
