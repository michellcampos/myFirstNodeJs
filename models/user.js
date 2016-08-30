var db = require('../config/db');

exports.getAll = function () {
    db.query('SELECT * FROM user', function(err, result) {
        if (err) throw err;
        return result;
    });
};

exports.checkTaxvatExist = function (taxvat, callback) {
  db.query('SELECT taxvat FROM user WHERE taxvat=?', taxvat, function (err, result) {
      if(err) throw err;
      callback(null, result);
  });
};

exports.checkEmailExist = function (email, callback) {
    db.query('SELECT email FROM user WHERE email=?', email, function (err, result) {
        if(err) throw err;
        callback(null, result);
    });
};

exports.checkUserExist = function (user, callback) {
    db.query('SELECT username FROM user WHERE username=?', user, function (err, result) {
        if(err) throw err;
        callback(null, result);
    });
};