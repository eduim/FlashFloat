import { expect, test } from 'vitest'
import request from 'supertest'
import path from 'node:path'
import startServer from '../app'
import fileModel from '../models/file'
import fs from 'node:fs'

const app = startServer()

test('GET /', async () => {
  const response = await request(app).get('/')
  expect(response.status).toBe(200)
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

  console.log(response.body)
  // const uploadId = response.body.upload.id

  // const files = await fileModel.findFiles(uploadId)

  // if (files) {
  //   files.forEach((file) => {
  //     fs.unlinkSync(file.path)
  //   })
  // }

  // expect(response.status).toBe(201)
  // expect(response.body).toMatchObject({
  //   upload: {
  //     id: expect.any(Number),
  //     uploadedAt: expect.any(String),
  //     title,
  //     message,
  //     expiresAt: expect.any(String),
  //     uploaderId: expect.any(Number),
  //     downloaderId: expect.any(Number),
  //   },
  // })
})
