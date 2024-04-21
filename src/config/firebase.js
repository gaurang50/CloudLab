
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fir-react-app-125d9.firebaseapp.com",
  projectId: "fir-react-app-125d9",
  storageBucket: "fir-react-app-125d9.appspot.com",
  messagingSenderId: "748362195409",
  appId: "1:748362195409:web:3a9b42d5ae92aaf3da80f0",
  measurementId: "G-DM69GFMPB9"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider(); 

export { auth, db, googleAuthProvider }; 

