export const resourceId = ({type, id}) => `${type}:${id}`

export const getTypeIdFromResourceId = (resourceId) => {
  const [type, id] = resourceId.split(':')

  return { type, id }
}
