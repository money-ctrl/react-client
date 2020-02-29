import {
  db as database,
  firebase
} from '../firebase'

export const enablePersistence = () => {
  database.enablePersistence()
    .catch((error) => {
      if (error.code === 'failed-precondition') {
        alert(
          'Multiple tabs open, off-line mode can only be enabled in one '+
          'tab at a time. Close all tabs and try again.')
      } else if (error.code === 'unimplemented') {
        alert(
          'The current browser does not support all of the '+
          'features required to enable persistence.')
      }
    })
}

export const userLogout = async () => {
  await firebase.auth().signOut()
    .catch(console.error) // eslint-disable-line no-console
}

export {
  database,
}
