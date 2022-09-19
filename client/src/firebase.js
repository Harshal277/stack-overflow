// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYkej9OsOUS02dQdBIVrPA_KCo3vzuGSc",
  authDomain: "stack-overflow-clone-737f5.firebaseapp.com",
  projectId: "stack-overflow-clone-737f5",
  storageBucket: "stack-overflow-clone-737f5.appspot.com",
  messagingSenderId: "912068623522",
  appId: "1:912068623522:web:fccb70240b88d18d9eebfb",
  measurementId: "G-X2ZD9NKGP4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

export default firebase