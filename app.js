var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
const http = require('http');  //1 avec npm i nodemon

require("dotenv").config(); //2

const {connectToMongoDB} = require("./db/db")//3

// importation des routers 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var osRouter = require('./routes/osRouter');
var authRouter = require('./routes/authRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// kol gestion 3indha route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os',osRouter);
app.use('/auth',authRouter);
// in my case mathalan app.use('/events', eventsRouter);

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

const server = http.createServer(app);  //1
server.listen(process.env.PORT,()=>{connectToMongoDB(),console.log("app is running on port 5000")});  //1 //2 process.env.PORT