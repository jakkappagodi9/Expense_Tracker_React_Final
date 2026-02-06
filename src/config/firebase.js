// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCb4J3V4RE0uE33m1fqaJztEPZZyN4_pUE',
  authDomain: 'expensetrackerfinal-2d3e5.firebaseapp.com',
  projectId: 'expensetrackerfinal-2d3e5',
  storageBucket: 'expensetrackerfinal-2d3e5.firebasestorage.app',
  messagingSenderId: '171192888223',
  appId: '1:171192888223:web:3459b96893448f54ccabaa',
  databaseURL: 'https://expensetrackerfinal-2d3e5-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
