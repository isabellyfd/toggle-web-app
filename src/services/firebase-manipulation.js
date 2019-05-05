const firebase = require('firebase');
const uuidv1 = require('uuid/v1');

const config = {
    apiKey: "AIzaSyC1j_HZ0NNceyP4ixqHdbkra4vHhqtIArc",
    authDomain: "toggle-app-ed92c.firebaseapp.com",
    databaseURL: "https://toggle-app-ed92c.firebaseio.com",
    projectId: "toggle-app-ed92c",
    storageBucket: "toggle-app-ed92c.appspot.com",
    messagingSenderId: "572630900278"
};

firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();

module.exports = {
    createUserWith(email, password) {
        return auth.createUserWithEmailAndPassword(email, password); 
    },
    signInWith(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }, 
    createApplication(userId, application) {
        return db.collection(userId).doc().set(application);
    },
    getAllApplicationByUser(userId) {
        return db.collection(userId).get();
    },
    addToggleForApplication(applicationId, toggle){
        return db.collection(applicationId).doc().set(toggle);
    },
    updateToggleForApplication(applicationId, toggleId, toggle) {
        return db.collection(applicationId).doc(toggleId).update(toggle);
    }
}
