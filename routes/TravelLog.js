var data = require( __dirname + '/../data/test.json');

exports.TravelLog = function(req, res){
  try {
    res.render('TravelLog', {title : 'TravelLog'});
  } catch (e) {
    next(e)
  }
};
