
//firebase database 설정
var admin = require('firebase-admin');
var serviceAccount = require('./sss0-461c0-firebase-adminsdk-zxu2e-62f16cd13a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sss0-461c0.firebaseio.com/'
});


var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');

var indexRouter = require('./routes/index')(admin.database());
var usersRouter = require('./routes/users');
var surveyRouter = require('./routes/survey')(admin.database());

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);



//firebase data 읽기,쓰기 등등 부분
app.get('/', function(req, res, next) {

    var db = admin.database();
//.ref().once()부분(읽기)


    db.ref('test/').once('value').then(function(snapshot){
      var abc = snapshot.val();

      res.render('index', { title:abc });
  });
// set()기본쓰기작업
var user = 'users/';
    db.ref(user).child('userid').child('email').set('sjk1418@naver.com');


//.push()부분(저장)//javascript연동필요

// db.ref('users/'+ uid).push({
//     email: "sojung2"
//
//     });
// //.update()부분(수정)
// db.ref('users/'+ uid).update({
//     email: "sojung2"
//
//   });


});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render t;he error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
