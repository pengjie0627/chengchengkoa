var mysql = require('mysql');
var config = require('./config');

module.exports = function () {
    var connection = mysql.createConnection(config);
    connection.connect();
    return connection
};