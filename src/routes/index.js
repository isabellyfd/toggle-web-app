const routes = require('./toggle-app-routes');

module.exports = app => {
    app.use('/', routes);
};