var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var multer = require('multer');
var done = false;

//configure express to use body-parser as middle-ware


//var io = require('socket.io').listen(app);
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var querystring = require('querystring');
var azure = require('azure-storage');


app.get('/submit',function(req,res){
res.sendFile(__dirname + '/submit.html');
});

app.get('/register',function(req,res){
  res.sendFile(__dirname + '/interface/register.html');
});

//multer stuff
app.use(multer({ dest: './upload/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;

  //run alans pdf PROGRAM
  //run alans nlp PROGRAM
  //get nonprofits from azure database

  //return data to browser
  socket.emit('results', data);
}
}));

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
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
          console.log(resultObject.toString());
      });
  });

  req.on('error', function (e) {
      // TODO: handle error.
  });

  req.write(userString);
  req.end();
});


var getNonprofits = function(callback){

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
      method: 'GET',
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

        res.on('end', callback(responseString));
    });

    req.on('error', function (e) {
        // TODO: handle error.
    });

    req.write(userString);
    req.end();

}



//uploads (and replaces if there is existing?) pdf associated with a given user
var uploadPdf = function(user, pdfpath){


}

//uploads (and replaces if there is existing?) pdf associated with a given user
var uploadImage = function(user, pdfpath){


}

io.on('connection',function(socket){
  console.log('a user connected');
  socket.on('disconnect',function(){
    console.log('a user disconnected');

  });

  socket.on('pdf-uploaded', function(data){
    fs.readFile(_dirname+"/"+data.filepath, function(err, data){
      if (err){
        throw err;
      }
      //TODO: RUN ALAN'S PDF READER PROGRAM ON THIS PDF filepath
      //TODO: RUN ALAN'S NLP ON THE PDF text
      //get company data from database
      getNonprofits(function(responseString){
        var parsed = JSON.parse(responseString);

      })

    })//doesn't handle duplicate filepaths

  })

});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
