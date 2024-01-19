import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVyWPX_w9h-203Y6IP8nsDXhT8BDjqsTM",
  authDomain: "watch-shop-prod.firebaseapp.com",
  projectId: "watch-shop-prod",
  storageBucket: "watch-shop-prod.appspot.com",
  messagingSenderId: "320222441914",
  appId: "1:320222441914:web:ee5ba41e266d25fe086d83"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
