import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Cd-098xJgz6FvYHNaKRXsQwlU41XtjE",
  authDomain: "smartspend-7dfdc.firebaseapp.com",
  projectId: "smartspend-7dfdc",
  storageBucket: "smartspend-7dfdc.appspot.com",
  messagingSenderId: "1034968117344",
  appId: "1:1034968117344:web:2757c8dc08bb413daf1305",
  measurementId: "G-KHCRDF2E9K"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт Firestore (вместо Realtime Database)
export const db = getFirestore(app);