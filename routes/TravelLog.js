exports.TravelLog = function(req, res){
  try {
    res.render('TravelLog', {title : 'TravelLog'})
  } catch (e) {
    next(e)
  }
};
