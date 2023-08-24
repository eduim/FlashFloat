import { PrismaClient, File} from "@prisma/client"

const prismaInstance = new PrismaClient()


const downloadModel = {

  async findFirst(uploadId:number):
  Promise<File| null> {

    const result = await prismaInstance.file.findFirst({
      where: {
        uploadId:uploadId
      }
    })
    if (!result) {
      throw new Error ("No record found")
      
    }
    return result
    
  }


}

export default downloadModel








