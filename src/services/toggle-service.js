const Application = require('../models/application');
const db = require('./firebase-manipulation');

module.exports = {
    ping() {
        return "PONG! You've found an API!";
    },
    createApplicationForUserwithName(userId, name) {
        const application = {
            name,
            toggles: []
        };
        return db.createApplication(userId, application);
    },
    createNewUser(email, password) {
        return db.createUserWith(email, password);
    },
    signInWith(email, password) {
        return db.signInWith(email, password);
    },
    getApplicationsByUser(userId) {
        return db.getAllApplicationByUser(userId);
    }
};