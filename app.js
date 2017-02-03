var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());                             // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/json

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept, Authorization, charset');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

/*
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/reviewking', function(err, db) {
  if (err) throw err;

  db.collection('pets').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  })
});
*/

// database connection

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviewking');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var petSchema = mongoose.Schema({
  name: String,
  weight: Number,
  age: Number
});

var Pet = mongoose.model('Pet', petSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs for db if you want to use
  // select all
  app.get('/pets', function (req, res) {
    Pet.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });
  
  // find by id
  app.get('/pet/:id', function(req, res) {
    Pet.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });
  
  //create
  app.post('/pet', (req, res) => {
    let obj = new Pet(req.body);
    obj.save((err, obj) => {
      if (err) return console.error(err);
      res.status(200).json(obj);
    })
  });

  // Point static path to ngCms/dist
  app.use(express.static(path.join(__dirname, 'ngCms/dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ngCms/dist/index.html'));
  });

// view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', index);
  app.use('/users', users);

 // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

});
module.exports = app;
