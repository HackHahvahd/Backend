var express = require('express');
var bodyP\parser = require('body-parser');
var app = express();

//configure express to use body-parser as middle-ware
app.use(express.bodyparser());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//var io = require('socket.io').listen(app);
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var querystring = require('querystring');
var azure = require('azure-storage');


app.get('/main',function(req,res){
res.sendFile(__dirname + '/main.html');
});

app.get('/register',function(req,res){
  res.sendFile(__dirname + '/interface/register.html');
});


//handle user info submission
app.post('/register/user', function(req, res){
  console.log("Got user registration!");
  //console.log(req);
  console.log('Username: ' + req.body.user);
  console.log('Password: ' + req.body.pass);
  var body = "";
  req.on('data',function(chunk){
    body += chunk;
    console.log(chunk);
  });

  req.on('end', function() {
      var decodedBody = querystring.parse(body);

      console.log(decodedBody);
      var json = JSON.parse(body);
      console.log(json.user);
      console.log(decodedBody.pass);
      console.log(decodedBody.email);
       // empty 200 OK response for now
       res.writeHead(200, "OK", {'Content-Type': 'text/html'});
       res.end();
  });


});

var pushNewUserRegistration = function(username, password, email){


  var entry = {
    id: username,
    password: password,
    email: email

  };

  var entryString = JSON.stringify(entry);

  var headers = {
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'Content-Length': entryString.length,
      'X-ZUMO-APPLICATION': config.appkey
  };

  var options = {
    host: config.mobileservices + '.azure-mobile.net',
    port: 443,
    path: '/tables/'+config.table,
    method: 'POST',
    headers: headers
  };

  // Setup the request.  The options parameter is
  // the object we defined above.
  var req = https.request(options, function (res) {
      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function (data) {
          responseString += data;
      });

      res.on('end', function () {
          var resultObject = JSON.parse(responseString);
      });
  });

  req.on('error', function (e) {
      // TODO: handle error.
  });

  req.write(userString);
  req.end();
}

//handle nonprofit info submission
app.get('/submit/nonprofit', function(req, res){
  var nonprofitName;
  var keywords;
  var blurb;


  var entry = {
    id: nonprofitName,
    keywords: keywords,
    blurb: blurb,
    thumbnail_path: null //TODO

  };

  var entryString = JSON.stringify(entry);

  var headers = {
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'Content-Length': entryString.length,
      'X-ZUMO-APPLICATION': config.appkey
  };

  var options = {
    host: config.mobileservices + '.azure-mobile.net',
    port: 443,
    path: '/tables/'+config.table,
    method: 'POST',
    headers: headers
  };

  // Setup the request.  The options parameter is
  // the object we defined above.
  var req = https.request(options, function (res) {
      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function (data) {
          responseString += data;
      });

      res.on('end', function () {
          var resultObject = JSON.parse(responseString);
      });
  });

  req.on('error', function (e) {
      // TODO: handle error.
  });

  req.write(userString);
  req.end();
});


//uploads (and replaces if there is existing?) pdf associated with a given user
var uploadPdf = function(user, pdfpath){


}

//uploads (and replaces if there is existing?) pdf associated with a given user
var uploadImage = function(user, pdfpath){


}


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
