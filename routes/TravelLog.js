var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object
//jsonContent.adventures[1].name = "no";  //go to adventures[1].name = Testtingg
jsonfile.writeFileSync(__dirname + '/../data/TESTING.json', jsonContent); //write back the stuff we changed



exports.TravelLog = function(req, res){
  try {
      //runs the TravelLog pug file!!!
      res.render('TravelLog', jsonContent); //data is our json file with all the data!!!

  } catch (e) {
    next(e)
  }
};
