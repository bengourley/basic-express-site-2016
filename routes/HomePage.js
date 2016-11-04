var express = require("express")
var app = express()

var data = require( '../data/test.json');

exports.HomePage = function(req, res){
  try {
    //renders (jade file, title you want to give it)
    var marks = [];
    marks[0] = data.markers[0];
    marks[1] = data.markers[1];
    marks[2] = data.markers[2];
    res.render('homepage', {
      title : 'HomePage2',
      markers : marks,
      newLoc: 0
    });

 } catch (e) {
    next(e)
  }

 
};
