'use strict';
const uuidv1 = require('uuid/v1');

module.exports.Application = class Application {
    constructor(){
        this.identifier = uuidv1();
        this.toggles = [];
    }
}