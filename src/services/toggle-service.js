const Application = require('../models/application');
const db = require('./firebase-manipulation');

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
        return db.signInWith(email, password);
    },
    getApplicationsByUser(userId) {
        return db.getAllApplicationByUser(userId);
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