import { v4 as uuidv4 } from 'uuid'

const generateRandomId = (): string => {
  return uuidv4()
}

export default generateRandomId
