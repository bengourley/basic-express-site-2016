// To familiarize what I did in this file go to link below
// http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus

var express = require('express')
  , logger = require('morgan')
  , app = express()
  , stylus = require('stylus')
  , nib = require('nib');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//defining a compile function so it compiles my .styl files
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
  app.set('views', __dirname + '/views') //gets where our page maker is
  app.set('view engine', 'pug')                //sets engine to jade
  app.use(stylus.middleware(
  { src: __dirname + '/public'      //compile .styl files in /public folder
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'))


/* ============================================== */
/* ======= ROUTES  ============================== */
/* ============================================== */

/* EVERY app.get IS A ROUTE*/
var AdventureAnalytics = require(__dirname + '/routes/AdventureAnalytics');
app.get('/AdventureAnalytics', AdventureAnalytics.AdventureAnalytics);


var TravelLog = require( __dirname + '/routes/TravelLog');
app.get('/TravelLog', TravelLog.TravelLog);


var LoggedAdventure = require( __dirname + '/routes/LoggedAdventure');
app.get('/LoggedAdventure', function(req, res){
  console.log(req.body);
  return res.render('logged-adventure', {title: "POOP", lat: req.body.lat});
});
app.post('/LoggedAdventure', LoggedAdventure.Submit);

//HOMEPAGE
var HomePage = require( __dirname + '/routes/HomePage');
app.get('/Home', HomePage.HomePage);

//base route redirects to homepage
app.get('/', function(req,res, next){
  res.redirect('/Login');
});

var adventure = require(__dirname + '/routes/adventure');
app.get('/adventure/:name', adventure.getAdventure);



var Login = require( __dirname + '/routes/Login');
app.get('/Login', Login.Login);
app.post('/Login', Login.Submit);


app.post('/CreateNewAdventure', function(req, res){
  var lat = req.body.lat;
  var lng = req.body.lng;
  res.send({"page": "LoggedAdventure"});
  res.render('logged-adventure', {title: "JWOW"});
  //res.render('homepage', {newLoc: {lat: 0, lng: 0}});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
