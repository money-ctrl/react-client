import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig.json'

export default firebase.initializeApp(firebaseConfig)
