var data = require( __dirname + '/../data/test.json');

exports.TravelLog = function(req, res){
  try {
    console.log(data.markers[0]);
    res.render('TravelLog', {title : 'TravelLog'});
  } catch (e) {
    next(e)
  }
};
