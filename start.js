var express = require('express');
var app = express();
var fs = require('fs');
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

app.get('/saveemail/:email', function(req, res) {
  var email = req.params.email;
  if(validateEmail(email)) {
    fs.appendFile("email.txt", email + "\n");
    res.send("1");
  }
  else { res.send("0");}
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.listen(8080, function () {
  console.log('Example app listening on port 80!')
});
