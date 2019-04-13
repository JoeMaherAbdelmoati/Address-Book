import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var config = {
    apiKey: "AIzaSyD8THhtEUmz1YU8e-InjEZ-H6FMA6njJXI",
    authDomain: "address-book-5821a.firebaseapp.com",
    databaseURL: "https://address-book-5821a.firebaseio.com",
    projectId: "address-book-5821a",
    storageBucket: "address-book-5821a.appspot.com",
    messagingSenderId: "750159305876"
};
firebase.initializeApp(config);

export default firebase