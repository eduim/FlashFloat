import { Request, Response } from 'express'

const uploadController = {
  async upload(req: Request, res: Response) {
    console.log('here')
    console.log(req.file, req.body)
    res.json({
      ok: true,
    })
  },
}

export default uploadController
