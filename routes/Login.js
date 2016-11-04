exports.Login = function(req, res){
  try {
    res.render('Login', {title : 'Login'});
  } catch (e) {
    next(e)
  }
};

exports.Submit = function(req, res) {
  res.redirect('/Home');
}
