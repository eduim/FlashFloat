export type Upload = {
  title: string
  message: string
  uploader: {
    email: string
  }
  downloader: {
    email: string
  }
  file: File[]
}

export type File = {
  id: number
  uploadedAt: Date
  fileName: string
  size: number
  typeOfFile: string
  path: string
  uploadId: number
}
