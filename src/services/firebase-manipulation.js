const firebase = require('firebase');
const uuidv1 = require('uuid/v1');
const winston = require('winston');
const config = {
    apiKey: "AIzaSyC1j_HZ0NNceyP4ixqHdbkra4vHhqtIArc",
    authDomain: "toggle-app-ed92c.firebaseapp.com",
    databaseURL: "https://toggle-app-ed92c.firebaseio.com",
    projectId: "toggle-app-ed92c",
    storageBucket: "toggle-app-ed92c.appspot.com",
    messagingSenderId: "572630900278"
};

firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = { 
    createApplication(userId, application) {
        return db.collection(userId).doc().set(application);
    },
    getAllApplicationByUser(userId) {
        return db.collection(userId).get();
    },
    getAllTogglesForApplication(applicationId){
        return db.collection(applicationId).get();
    },
    addToggleForApplication(applicationId, toggle){
        return db.collection(applicationId).doc().set(toggle);
    },
    updateToggleForApplication(applicationId, toggleId, toggle) {
        return db.collection(applicationId).doc(toggleId).update(toggle);
    }
}
