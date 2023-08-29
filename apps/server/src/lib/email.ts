import { CourierClient } from '@trycourier/courier'

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error('missing Courier api key')

const courier = CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
})

export type EmailContact = {
  uploaderEmail: string
  downloaderEmail: string
  title?: string
  message?: string
}

const constructMessage = (
  downloadUrl: string,
  title?: string,
  message?: string
) => {
  return `
    ${title} \n
    ${message || ''} \n
    ${downloadUrl}
    `
}

export const notifyDownloader = async (
  uploadId: string,
  uploaderEmail: string,
  downloaderEmail: string,
  title?: string,
  message?: string
) => {
  await courier.send({
    message: {
      to: {
        email: downloaderEmail,
      },
      content: {
        title: `${uploaderEmail} contacted you in flashfloat!`,
        body: constructMessage(
          `http://localhost:3000/download/${uploadId}`,
          title,
          message
        ),
      },
      routing: {
        method: 'single',
        channels: ['email'],
      },
    },
  })
}

export const notifyUploader = async (
  uploaderEmail: string,
  downloaderEmail: string,
  title?: string,
  message?: string
) => {
  await courier.send({
    message: {
      to: {
        email: uploaderEmail,
      },
      content: {
        title: `You have sent some files to ${downloaderEmail}`,
        body: constructMessage('', title, message),
      },
      routing: {
        method: 'single',
        channels: ['email'],
      },
    },
  })
}
