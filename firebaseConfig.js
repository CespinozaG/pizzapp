// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMi464IEjokmpU9bKkLkia-DujY5-sNpk",
  authDomain: "appmascotasprueba.firebaseapp.com",
  projectId: "appmascotasprueba",
  storageBucket: "appmascotasprueba.appspot.com",
  messagingSenderId: "566600172406",
  appId: "1:566600172406:web:f9ca73669bac9faedb3057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};