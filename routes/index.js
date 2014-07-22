var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/url/:url', function(req, res, next){

  // var url_parts = url.parse(req.params.url, true);
  var url = 'http://'+req.params.url;   
  // console.log(_.map(req.query, function(key, value){ return key+'='+value+',' }) );
 
  if(req.query){
    var queryObj = _.map(req.query, function(value, key){ return key+'='+value });
    var str = '';
    var queryStr = queryObj.join('&');
    url += '/?'+queryStr;
  }
  console.log('Url: ', url);
  request(url, function (error, response, body) {
    // console.log('Error: ', error);
    // console.log('Response', response);
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;
