import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2rbad0uKYNHFWTXP_Y5kf9hHsuHYlf7Y",
  authDomain: "ecomm-test1-9c367.firebaseapp.com",
  projectId: "ecomm-test1-9c367",
  storageBucket: "ecomm-test1-9c367.appspot.com",
  messagingSenderId: "502467434280",
  appId: "1:502467434280:web:fb29e0ae2b6a96ed3a621d",
  measurementId: "G-TRQVEC17ZL",
};

// initialize firebase
export const app = initializeApp(firebaseConfig);

//initialize firestore
export const database = getFirestore(app);

//export function to initialize firebase
export const initFirebase = () => {
  return app;
};
