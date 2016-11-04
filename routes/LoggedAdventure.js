exports.LoggedAdventure = function(req, res){
  try {
    //renders (jade file, title you want to give it)
    console.log(req);
    res.render('logged-adventure', {title : 'Logged Adventure'})
  } catch (e) {
    next(e)
  }
};
