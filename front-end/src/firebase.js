import firebase from "firebase";
import "firebase/storage";
require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyDTu1aSX8UIZ_MSa7egMjtyS4qfgq3De44",
  authDomain: "tweedle-70f3b.firebaseapp.com",
  databaseURL: "https://tweedle-70f3b.firebaseio.com",
  projectId: "tweedle-70f3b",
  storageBucket: "tweedle-70f3b.appspot.com",
  messagingSenderId: "61807187015",
  appId: "1:61807187015:web:b21572949244083e020d62",
  measurementId: "G-P9KH4H08YV",
  //   apiKey: "AIzaSyCsNlY3XJezXtEkm7phNuJ9oCST7cjkGeM",
  //   authDomain: "connect-d8a3e.firebaseapp.com",
  //   projectId: "connect-d8a3e",
  //   storageBucket: "connect-d8a3e.appspot.com",
  //   messagingSenderId: "963552633262",
  //   appId: "1:963552633262:web:d92a7d739d4d1fe3a0283f",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebaseApp.firestore();
export const storage = firebase.storage();
