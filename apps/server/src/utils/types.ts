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

export enum Role {
  Uploader = 'UPLOADER',
  Downloader = 'DOWNLOADER',
}
