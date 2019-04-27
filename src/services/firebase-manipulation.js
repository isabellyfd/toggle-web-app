const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyC1j_HZ0NNceyP4ixqHdbkra4vHhqtIArc",
    authDomain: "toggle-app-ed92c.firebaseapp.com",
    databaseURL: "https://toggle-app-ed92c.firebaseio.com",
    projectId: "toggle-app-ed92c",
    storageBucket: "toggle-app-ed92c.appspot.com",
    messagingSenderId: "572630900278"
};

firebase.initializeApp(config);

module.exports = {
    createUserWith(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password); 
    },
    signInWith(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
