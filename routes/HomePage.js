var express = require("express")
var app = express()

var data = require( '../data/test.json');

exports.HomePage = function(req, res){
  try {
    //renders (jade file, title you want to give it)
    res.render('homepage', {
      title : 'HomePage2',
      markers : data.markers
    });

 } catch (e) {
    next(e)
  }

 
};
