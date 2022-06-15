import clone from 'clone'

export const resourceId = ({type, id}) => `${type}:${id}`

export const getTypeIdFromResourceId = (resourceId) => {
  const [type, id] = resourceId.split(':')

  return { type, id }
}

export const set = (original, name, value) => {
  const object = clone(original)
  const path = name.split('.')

  let head = object

  while (path.length > 1) {
    const key = path.shift()

    // eslint-disable-next-line no-prototype-builtins
    head[key] = head.hasOwnProperty(key) ? head[key] : {}

    head = head[key]
  }

  head[path.shift()] = value

  return object
}

export const get = (object, name) => {
  const path = name.split('.')

  return path.reduce((value, path) => value !== undefined ? value[path] : undefined, object)
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

// inverse of flat
export const inflate = (original) => {
  return Object.entries(original)
    .reduce((object, [key, value]) => set(object, key, value), {})
}

export const merge = (target, merged) => {
  return inflate({
    ...flat(target),
    ...flat(merged),
  })
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
