// import { PrismaClient, Upload, User, File } from '@prisma/client'

// const prismaInstance = new PrismaClient()

// // user uploaded a pictore to the front end
// // the front end sends a req with the files
// // upload the file to s3 and get the download url back
// // create the db record with the download url

// async function create(
//   title: string,
//   message: string,
//   files: File[]
// ): Promise<Upload> {
//   const uploadFile = await prismaInstance.upload.create({
//     data: {
//       title,
//       message,
//     },
//     connect,
//   })

//   return uploadFile
// }
