var express = require('express');
var app = express();
app.set('view engine', 'ejs');
function getTitle(s) {
  var re = /(\b[a-z](?!\s))/g;
  s = s.replace(/-/g, " ");
  s = s.replace(re, function(x){return x.toUpperCase();});
  return s;
}


// 'use strict';
//
// require('letsencrypt-express').create({
//
//   server: 'https://acme-v01.api.letsencrypt.org/directory'
//
// , email: 'namlgiangbiz@gmail.com'
//
// , agreeTos: true
//
// , approveDomains: [ 'fidgetinsider.com' ]
//
// , app: app.use(express.static('public'))
//
// }).listen(80, 443);


var leStore = require('le-store-certbot').create({
  configDir: '/etc/letsencrypt',          // or /etc/letsencrypt or wherever
  privkeyPath: ':configDir/live/fidgetinsider.com/privkey.pem',          //
  fullchainPath: ':configDir/live/fidgetinsider.com/fullchain.pem',      // Note: both that :configDir and :hostname
  certPath: ':configDir/live/fidgetinsider.com/cert.pem',                //       will be templated as expected by
  chainPath: ':configDir/live/fidgetinsider.com/chain.pem',              //       node-letsencrypt
  workDir: '/etc/letsencrypt/var/lib',
  logsDir: '/etc/letsencrypt/var/log',
  webrootPath: '/etc/letsencrypt/srv/www/fidgetinsider.com/.well-known/acme-challenge',
  debug: false
});


// returns an instance of node-letsencrypt with additional helper methods
var lex = require('letsencrypt-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  //server: 'staging',
  server: 'https://acme-v01.api.letsencrypt.org/directory',

  // If you wish to replace the default plugins, you may do so here
  //
  challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/etc/letsencrypt/var/acme-challenges' }) },
  store: leStore,


  // You probably wouldn't need to replace the default sni handler
  // See https://github.com/Daplie/le-sni-auto if you think you do
  //, sni: require('le-sni-auto').create({})

  approveDomains: approveDomains
});

function approveDomains(opts, certs, cb) {
  // TODO - verify domain

  if (certs) {
     opts.domains = certs.altnames;
   }
  else {
     opts.email = 'namlgiang@gmail.com';
     opts.agreeTos = true;
  }

  cb(null, { options: opts, certs: certs });
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

// handles acme-challenge and redirects to http
require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});

server = require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});
