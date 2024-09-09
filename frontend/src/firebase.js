// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaPt5yNxvKH83RDK_jbD3fG84YjLiwyPE",
  authDomain: "fonte-real-project.firebaseapp.com",
  projectId: "fonte-real-project",
  storageBucket: "fonte-real-project.appspot.com",
  messagingSenderId: "51388499639",
  appId: "1:51388499639:web:2042fbecf75ab08cda2f32",
  measurementId: "G-4JC7H2YE4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app