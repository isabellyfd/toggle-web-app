const db = require('./firebase-manipulation');
const winston = require('winston');

module.exports = {
    ping() {
        return "PONG! You've found an API!";
    },
    createApplicationForUserwithName(userId, name) {
        const application = {
            name
        };
        return db.createApplication(userId, application);
    },
    createNewUser(email, password) {
        return db.createUserWith(email, password);
    },
    signInWith(email, password) {
        winston.info(db.signInWith);
        return db.signInWith(email, password);
    },
    getApplicationsByUser(userId) {
        return db.getAllApplicationByUser(userId);
    },
    getTogglesForApplication(applicationId) {
        return db.getAllTogglesForApplication(applicationId);
    },
    addToggle(applicationId, toggleName, toggleValue){
        const toggle = {
            name: toggleName,
            value: toggleValue
        };
        return db.addToggleForApplication(applicationId, toggle);
    },
    updateToggle(applicationId, toggleId, toggleName, toggleValue) {
        const toggle = {
            name: toggleName,
            value: toggleValue
        }
        return db.updateToggleForApplication(applicationId, toggleId, toggle);
    }
};