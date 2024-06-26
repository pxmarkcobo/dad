import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCF2iWDPEpKzNR5CpP0aoQoANWfuRWoERY",
  authDomain: "death-aid.firebaseapp.com",
  projectId: "death-aid",
  storageBucket: "death-aid.appspot.com",
  messagingSenderId: "483133142756",
  appId: "1:483133142756:web:efe79efd177260dbd35ef1",
}

const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)
export const googleAuthProvider = new GoogleAuthProvider()
