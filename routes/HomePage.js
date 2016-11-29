var express = require("express")
var app = express()
var fs = require('fs');
var data = require( '../data/data.json');
var globalUser;
var NeoGeocoder = require('node-geocoder');

exports.HomePage = function(req, res){
  try {
    var jsonfile = require('jsonfile'); //so we can easily write to json
    jsonfile.spaces = 4; //so when we write to jsonfile it formats
    var filepath = __dirname + "/../data/data.json";
    data = jsonfile.readFileSync(filepath); //read file and put as json object
    var user = req.params.user;
    var firstTime = req.params.firstTime;
    for(var i = 0; i<data.users.length; i++){
       if(data.users[i].id === user){
         res.render('homepage', {user: jsonContent.users[i], firstTime: firstTime});
       }
    }
 } catch (e) {
    next(e)
  }


};

exports.Logging = function(req, res) {
  //console.log(req.body)
  for(var i = 0; i<jsonContent.users.length; i++){
      if(jsonContent.users[i].id === req.body.userID){
          jsonContent.users[i].adventures.push({"lat": req.body.lat, "lng": req.body.lng});
      }
  }
  res.redirect('/TravelLog');
}
