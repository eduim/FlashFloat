import express from 'express'
import uploadController from './controllers/uploads.controller'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.get('/', (_, res) => {
  return res.status(200).json('hello')
})

router.post('/upload', upload.array('fileUpload'), uploadController.upload)

router.get('/download/:uploadId', uploadController.download)

export default router
