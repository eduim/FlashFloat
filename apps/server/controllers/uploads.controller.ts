export const newUpload = (req: any, res: any) => {
  const { body } = req.body

  const files = getFileInfo(body)
  // saving to s3
  const downloadUrls = ['this is gonna be provided by s3 later']

  const uploadsPromises = downloadUrls.map((dwurl) => {
    return await fileModel.create()
  })

  const files = Promise.all(uploadsPromises) as File[]
}
