var express = require('express');
var router = express.Router();
var path = require('path');

 //GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});
/*

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next()
});
// define the home page route
router.get('/', function (req, res) {
  res.send("aaaaaaaaaaaaaa");
});
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
});
*/

module.exports = router;
