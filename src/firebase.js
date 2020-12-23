import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBrjcNFvdypw8y5MAoRFx7YEUOzboO0MbU',
  authDomain: 'todo-608c4.firebaseapp.com',
  projectId: 'todo-608c4',
  storageBucket: 'todo-608c4.appspot.com',
  messagingSenderId: '797618314527',
  appId: '1:797618314527:web:abd2388db419826032242a',
  measurementId: 'G-FFG7QVDRFW',
})
const db = firebaseApp.firestore()
export default db
