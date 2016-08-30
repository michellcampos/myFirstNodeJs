var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');

var routes = require('./routes/index');
var user = require('./controllers/user/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(validator([]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'gorunner',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(express.static(path.join(__dirname, 'public')));

//GET
app.get('/', user.index);
app.get('/user/login', user.login);
app.get('/user/register', user.register);
app.get('/user/validate/taxvat', user.validate.taxvat);
app.get('/user/validate/email', user.validate.email);
app.get('/user/validate/username', user.validate.username);

// POST
app.post('/user/register', user.registerUser);
app.post('/user/login', user.loginUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;