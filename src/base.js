import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4nfdpE5TRMLL4QMNjFkYWyOaD577M2yA",
    authDomain: "catch-of-the-day-eli-g.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-eli-g-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;