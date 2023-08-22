import express from 'express'
import uploadController from './controllers/uploads.controller'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/', (_, res) => {
  console.log('here===>')
  return res.status(200).json('hello')
})

router.post('/upload', upload.single('fileUpload'), uploadController.upload)

export default router
