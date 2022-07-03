var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require('./services/db.js');

connectDB();

var indexRouter = require('./routes/index');
var meetingsRouter = require('./routes/meetings');
var studentsRouter = require('./routes/students');
var updateRouter = require('./routes/update');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser(process.env.SECRETKEY));
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    maxAge: 60000 
  } 
}));
app.use(flash());

/*
app.use((req, res, next) => {
  res.render('closed')
})
*/

app.use('/', indexRouter);
app.use('/meetings', meetingsRouter);
app.use('/students', studentsRouter);
app.use('/update', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
