const express = require('express');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));

app.get('/activity', function(req, res) {
  res.status(501).send();
});

app.get('/showmemybill', function(req, res) {
  res.status(501).send();
});

app.get('/ineedhelp', function(req, res) {
  res.status(501).send();
});

app.get('/products', function(req, res) {
  res.status(501).send();
});

app.get('/lightfaden', function(req, res) {
  res.status(501).send();
});

var server = app.listen(8080, function(err) {
  if (err) console.log(err);
  else console.log('server is running: http://localhost:3000');
});

process.on('SIGINT', function(){
  console.log('byebye');
  server.close();
});