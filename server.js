var express = require('express');
var app = express();

var io = require('socket.io').listen(app);
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var azure = require('azure-storage');

app.get('/main',function(req,res){
res.sendFile(__dirname + '/main.html');
});

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
})



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

io.sockets.on('connection', function(socket){

});
