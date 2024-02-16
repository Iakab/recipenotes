import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: 'recipenotes-e07df.firebaseapp.com',
  projectId: 'recipenotes-e07df',
  storageBucket: 'recipenotes-e07df.appspot.com',
  messagingSenderId: '416432297722',
  appId: '1:416432297722:web:5d43b64c9887ecd80c5b43',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
