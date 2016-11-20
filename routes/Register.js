var fs = require('fs');
var dialog = require('dialog');

var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object


exports.Register = function(req, res){
  try {
    res.render('Register', {title : 'Register'});
  } catch (e) {
    next(e)
  }
};

exports.Submit = function(req, res) {
  var validated = true;
  console.log(req.body);
  for(var i = 0; i<jsonContent.users.length; i++){
    if(jsonContent.users[i].id === req.body.username){
      validated = false;
    }
  }
  console.log("past for loop")
  if (req.body.password === req.body.confirmpassword && validated===true) {
      console.log("in if");
      var new_user = {"id":req.body.username, 
                "pwd": req.body.password,
                "adventures":[]};
      jsonContent.users.push(new_user);
      jsonfile.writeFileSync(__dirname + '/../data/data.json', jsonContent);      
      res.redirect('/Home/' + req.body.username);
    }
    else {
     console.log("into else")
      res.render('Register', {title: 'Register'})
    }
  };

