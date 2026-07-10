import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAErUaZVygj397HMyc6xx6AfrAO8lJiK2Y',
  authDomain: 'senior-interview-prep.firebaseapp.com',
  projectId: 'senior-interview-prep',
  storageBucket: 'senior-interview-prep.firebasestorage.app',
  messagingSenderId: '133220932008',
  appId: '1:133220932008:web:25d3811bb243136614a59d',
  measurementId: 'G-T5GHCS9981',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
