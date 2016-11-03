// To familiarize what I did in this file go to link below
// http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus

var express = require('express')
  , logger = require('morgan')
  , app = express()
  , stylus = require('stylus')
  , nib = require('nib');

//defining a compile function so it compiles my .styl files
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
  app.set('views', __dirname + '/views') //gets where our page maker is
  app.set('view engine', 'jade')                //sets engine to jade
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


//HOMEPAGE
app.get('/', function (req, res, next) {
  try {
    //renders from /views/homepage.jade. Notice the extend layout at the top of that file
    //sets the title to Home
    res.render('homepage', {title : 'Home'})
  } catch (e) {
    next(e)
  }
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
