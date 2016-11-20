var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object
//jsonContent.adventures[1].name = "no";  //go to adventures[1].name = Testtingg



exports.TravelLog = function(req, res){
  try {

    var user = req.params.user;
    for(var i = 0; i<jsonContent.users.length; i++){
       console.log("wow");
       console.log(user + "!");
       if(jsonContent.users[i].id === user){

         res.render('TravelLog', {user: jsonContent.users[i]});
      //runs the TravelLog pug file!!!
      //res.render('TravelLog', jsonContent); //data is our json file with all the data!!!
       }
    }
  } catch (e) {
    next(e)
  }
};
