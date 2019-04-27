const Application = require('../models/application');
const db = require('./firebase-manipulation');

module.exports = {
    ping() {
        return "PONG! You've found an API!";
    }, 
    createApplication(name) {
        return new Application(name);
    }, 
    createUser(email, password){
        return db.createUserWith(email, password);
    }
};