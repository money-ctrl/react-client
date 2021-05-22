export const resourceId = ({type, id}) => `${type}:${id}`

export const getTypeIdFromResourceId = (resourceId) => {
  const [type, id] = resourceId.split(':')

  return { type, id }
}

export const flat = (original) => {
  const object = {}

  const iterateKeys = (obj, path = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const keyParts = [...path, key]

      if (typeof value === 'object' && !Array.isArray(value)) {
        iterateKeys(value, keyParts)
        return
      }

      object[keyParts.join('.')] = value
    })
  }

  iterateKeys(original)

  return object
}

