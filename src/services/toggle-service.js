const Application = require('../models/application');

module.exports = {
    ping() {
        return "PONG! You've found and API!";
    }, 
    create(name) {
        return new Application(name);
    }
};