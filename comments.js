// Create web server and listen on port 3000
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listComments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/addComment', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var newComment = {
           "name": req.body.name,
           "comment": req.body.comment
       }
       data.push(newComment);
       console.log( data );
       fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
           if(err) {
               return console.log(err);
           }
           console.log("The file was saved!");
           res.end( JSON.stringify(data));
       });
   });
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Comments app listening at http://%s:%s", host, port)

})