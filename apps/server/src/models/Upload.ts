// import { Upload, File } from '@prisma/client'
// import prisma from '../lib/prisma'

// user uploaded a pictore to the front end
// the front end sends a req with the files
// upload the file to s3 and get the download url back
// create the db record with the download url

// async function create(
//   title: string,
//   message: string,
//   files: Partial<File>[],
//   uploaderId: number,
//   downloaderId: number
// ): Promise<Upload> {
//   const uploadFile = await prisma.upload.create({
//     data: {
//       title,
//       message,
//       uploaderId,
//       downloaderId,
//       files: {
//         createMany: {
//           data: files,
//         },
//       },
//     },
//   })

//   return uploadFile
// }
