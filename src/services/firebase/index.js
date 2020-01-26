import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig.json'

const app = firebase.initializeApp(firebaseConfig)

const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default app
export {
  firebase,
  firebaseui,
  app,
  ui,
}
