// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkKgtJ0Kb8-kJA5sgZcMnv0Ln7_wPTANI",
  authDomain: "dotes-discord.firebaseapp.com",
  projectId: "dotes-discord",
  storageBucket: "dotes-discord.appspot.com",
  messagingSenderId: "382021405468",
  appId: "1:382021405468:web:3346416a58e5d169b3c8d9",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
