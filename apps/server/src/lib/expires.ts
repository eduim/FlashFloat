const expiresAtDate = (): Date => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 7)
  return currentDate
}

export default expiresAtDate
