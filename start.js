var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/news', function(req, res) {
  res.render('news');
});

app.get('/top', function(req, res) {
  res.render('top');
});

app.get('/knowledge', function(req, res) {
  res.render('knowledge');
});

app.get('/buy', function(req, res) {
  res.render('buy');
});

app.listen(8080, function () {
  console.log('Example app listening on port 80!')
})
