import * as firebase from 'firebase';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ3mW66ePEpvvNDVFQ1KRdIioLATzlv0k",
  authDomain: "expensify-81a5f.firebaseapp.com",
  databaseURL: "https://expensify-81a5f.firebaseio.com",
  projectId: "expensify-81a5f",
  storageBucket: "expensify-81a5f.appspot.com",
  messagingSenderId: "898808636885",
  appId: "1:898808636885:web:f68fd756a05da2ab31095c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
// })

export { firebase, database as default };