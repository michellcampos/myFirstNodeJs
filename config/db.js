var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '172.17.0.2',
    user     : 'root',
    password : 'root',
    database : 'gorunner'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;