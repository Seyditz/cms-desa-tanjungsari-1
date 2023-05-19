// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEp45A25Wb_Q6ldJcPQyf7h7mr0srdeIo",
  authDomain: "tanjung-sari.firebaseapp.com",
  projectId: "tanjung-sari",
  storageBucket: "tanjung-sari.appspot.com",
  messagingSenderId: "590766288915",
  appId: "1:590766288915:web:8d1c3a40a875a64306cfe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app