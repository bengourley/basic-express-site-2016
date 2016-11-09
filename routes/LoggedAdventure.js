var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object

exports.LoggedAdventure = function(req, res){
  try {
    //renders (jade file, title you want to give it)
    res.render('logged-adventure', {title : 'Logged Adventure'})

 } catch (e) {
    next(e)
  }
};


exports.Submit = function(req, res) {
  console.log(req.body)
  jsonContent['adventures'].push(req.body)
  jsonfile.writeFileSync(__dirname + '/../data/TESTING.json', jsonContent); 
  res.redirect('/Home');
}
