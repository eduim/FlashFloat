import express from 'express'
import uploadController from './controllers/uploads.controller'
import multer from 'multer'

const uploadMulter = multer({ dest: '../uploads' })
const router = express.Router()

router.get('/', (_, res) => {
  console.log('here===>')
  return res.status(200).json('hello')
})

router.post('/upload', uploadMulter.single('file'), uploadController.upload)

export default router
