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

export const mapEntries = (object, transformer) => {
  if (!object) return undefined

  return Object.fromEntries(
    Object.entries(object)
      .map(transformer)
  )
}

export const mapValues = (object, transformer) => {
  return mapEntries(object, ([key, value]) => [key, transformer(value)])
}

export const trim = (str) => {
  if (typeof str !== 'string') return str

  return str.trim()
}
