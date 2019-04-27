const Application = require('../models/application');

module.exports = {
    ping() {
        return "PONG! You've found and API!";
    }, 
    create() {
        return new Application("weird name");
    }
};