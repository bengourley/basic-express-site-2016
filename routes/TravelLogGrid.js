var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object
//jsonContent.adventures[1].name = "no";  //go to adventures[1].name = Testtingg

exports.TravelLogGrid = function(req, res){
  try {

    var user = req.params.user;
    jsonContent.showGrid	=	true;
    jsonfile.writeFileSync(__dirname + '/../data/data.json', jsonContent);
    for(var i = 0; i<jsonContent.users.length; i++){
       if(jsonContent.users[i].id === user){
         res.render('TravelLog', {user: jsonContent.users[i], showGrid: jsonContent.showGrid});
      //runs the TravelLog pug file!!!
      //res.render('TravelLog', jsonContent); //data is our json file with all the data!!!
       }
    }
  } catch (e) {
    next(e)
  }
};
