// To familiarize what I did in this file go to link below
// http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus

var express = require('express')
  , logger = require('morgan')
  , app = express()
  , stylus = require('stylus')
  , nib = require('nib')
  , multer = require('multer')
  , path = require('path');

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
  app.set('views/analyticstabs.pug', __dirname+ '/views/analyticstabs.pug')
  app.set('views/graph.pug', __dirname+ '/views/graph.pug')
  app.set('view engine', 'pug')                //sets engine to jade
  app.use(stylus.middleware(
  { src: __dirname + '/public'      //compile .styl files in /public folder
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'))

var options = multer.diskStorage({ destination : 'public/images/' ,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
});

var upload = multer({ storage: options });

/* ============================================== */
/* ======= ROUTES  ============================== */
/* ============================================== */

/* EVERY app.get IS A ROUTE*/
var AdventureAnalytics = require(__dirname + '/routes/AdventureAnalytics');
app.get('/AdventureAnalytics/:user', AdventureAnalytics.AdventureAnalytics);


var TravelLog = require( __dirname + '/routes/TravelLog');
app.get('/TravelLog/:user', TravelLog.TravelLog);

var TravelLog = require( __dirname + '/routes/TravelLogGrid');
app.get('/TravelLogGrid/:user', TravelLog.TravelLogGrid);

var LoggedAdventure = require( __dirname + '/routes/LoggedAdventure');
app.get('/LoggedAdventure/:user/:lat/:lng', LoggedAdventure.LoggedAdventure);
app.post('/LoggedAdventure/:user/:lat/:lng', upload.single('Image'), LoggedAdventure.Submit);

app.get('/LoggedAdventure/:user/:lat/:lng/edit', LoggedAdventure.LoggedAdventureEdit);
app.post('/LoggedAdventure/:user/:lat/:lng/edit', upload.single('Image'), LoggedAdventure.SubmitEdit);

//HOMEPAGE
var HomePage = require( __dirname + '/routes/HomePage');
app.get('/Home/:user', HomePage.HomePage);
app.get('/Home/:user/:firstTime', HomePage.HomePage);

//base route redirects to homepage
app.get('/', function(req,res, next){
  res.redirect('/Login');
});

var adventure = require(__dirname + '/routes/adventure');
app.get('/adventure/:user/:name', adventure.getAdventure);


var Login = require( __dirname + '/routes/Login');
app.get('/Login', Login.Login);
app.post('/Login', Login.Submit);

var Register = require( __dirname + '/routes/Register');
app.get('/Register', Register.Register);
app.post('/Register', Register.Submit);

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
