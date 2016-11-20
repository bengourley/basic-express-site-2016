var fs = require('fs');
var dialog = require('dialog');

var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object

var globalUserID;

exports.Login = function(req, res){
  try {
    res.render('Login', {title : 'Login'});
  } catch (e) {
    next(e)
  }
};

exports.Submit = function(req, res) {
  //console.log(req.body)
  var found = false;
  for(var i = 0; i<jsonContent.users.length; i++){

      if(jsonContent.users[i].id === req.body.username){
          if(jsonContent.users[i].pwd === req.body.password){
		        globalUserID = req.body.username;
                //res.render('homepage', {user: jsonContent.users[i] });
            found = true;	      
		        res.redirect('/Home/' + jsonContent.users[i].id);
	        }
	        else{
//	          dialog.err("Invalid password!");
	        } 
      }
      else{
 //        dialog.err("Invalid user");
         res.redirect('/Login');
      }

  }
  if (!found) {
  //  dialog.err("Invalid username");
  }
  //res.redirect('/Login');
}
