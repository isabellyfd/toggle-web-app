const uuidv1 = require('uuid/v1');

function Application(name) {
    this.identifier = uuidv1();
    this.name = name;
    this.toggles = [];
}

module.exports = Application;