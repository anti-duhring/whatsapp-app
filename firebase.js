import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB9GFMDt-eFwqu-Q9_lNXhS5L6-Nk7SEJ0",
  authDomain: "wp-clone-26976.firebaseapp.com",
  projectId: "wp-clone-26976",
  storageBucket: "wp-clone-26976.appspot.com",
  messagingSenderId: "452905213846",
  appId: "1:452905213846:web:899cf49458802e410487b7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
});

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}