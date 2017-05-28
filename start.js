var express = require('express');
var app = express();
app.set('view engine', 'ejs');

function getTitle(s) {
  var re = /(\b[a-z](?!\s))/g;
  s = s.replace(/-/g, " ");
  s = s.replace(re, function(x){return x.toUpperCase();});
  return s;
}

app.use(express.static('public'));

app.locals = {
  title: null,
  article: null,
  knowledge: null
};

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/news', function(req, res) {
  res.render('news');
});

app.get('/news/:article', function(req, res) {
  res.render('news', {article: req.params.article, title: getTitle(req.params.article)});
});

app.get('/top', function(req, res) {
  res.render('top');
});

app.get('/knowledge', function(req, res) {
  res.render('knowledge');
});

app.get('/knowledge/:knowledge', function(req, res) {
  res.render('knowledge', {knowledge: req.params.knowledge, title: getTitle(req.params.knowledge)});
});

app.get('/picks', function(req, res) {
  res.render('picks');
});

app.listen(8080, function () {
  console.log('Example app listening on port 80!')
})
