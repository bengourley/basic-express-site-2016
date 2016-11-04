
exports.AdventureAnalytics = function(req, res){
  try {
    res.render('AdventureAnalytics', {title : 'AdventureAnalytics'})
  } catch (e) {
    next(e)
  }
};
