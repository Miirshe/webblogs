import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCor_3_IvlYG8-CNvw5MS-dxZn2AB2Puc4",
  authDomain: "blogs-magazine.firebaseapp.com",
  projectId: "blogs-magazine",
  storageBucket: "blogs-magazine.appspot.com",
  messagingSenderId: "229955458576",
  appId: "1:229955458576:web:f5f1db50633d1e85315c95"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app ;









// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCkG2goSrXgz56PIale1nyHvH62dtGDLTE",
//   authDomain: "blogs-webapp.firebaseapp.com",
//   projectId: "blogs-webapp",
//   storageBucket: "blogs-webapp.appspot.com",
//   messagingSenderId: "931401435982",
//   appId: "1:931401435982:web:d02d40046b32e2da8a6c1f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// firebase deploy
// npm install -g firebase-tools