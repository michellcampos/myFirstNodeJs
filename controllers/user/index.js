var model = require('../../models/user');
var flash = {};

exports.index = function(req, res) {
    res.redirect('user/login');
};

exports.login = function(req, res) {
    res.render('user/login');
};

exports.register = function(req, res) {
    res.render('user/register');
};

exports.registerUser = function (req, res) {
    // validate the input
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('display', 'DisplayName is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();

    // check the validation object for errors
    var errors = req.validationErrors();

    if (errors) {
        res.render('user/register', { flash: { type: 'alert-danger', messages: errors }});
    }
    else {
        res.render('user/register', { flash: { type: 'alert-success', messages: [ { msg: 'No errors!' }]}});
    }
};

exports.loginUser = function(req, res) {
    // pull the form variables off the request body
    var username = req.body.username;
    var password = req.body.password;
    // register the user with everlive
    el.Users.login(username, password).then(function(data) {
        // success
        res.render('dashboard')
    }, function(error){
        // failure
        locals.type = 'error';
        locals.message = error.message;
        res.render('user/login', { flash: flash });
    });
};

exports.validate = {
    taxvat: function (req, res) {
        model.checkTaxvatExist(req.query.value, function (err, result) {
            res.send(result.length === 0);
        });
    },
    email: function (req, res) {
        model.checkEmailExist(req.query.value, function (err, result) {
            res.send(result.length === 0);
        });
    },
    username: function (req, res) {
      model.checkUserExist(req.query.value, function (err, result) {
          res.send(result.length === 0);
      });
    }
};