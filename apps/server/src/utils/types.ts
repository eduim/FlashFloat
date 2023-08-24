export type Upload = {
  title: string
  message: string
  uploader: {
    email: string
  }
  downloader: {
    email: string
  }
  file: FileType[]
}

export type FileType = {
  fileName: string
  size: number
  typeOfFile: string
  path: string
}
