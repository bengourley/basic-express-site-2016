var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object
//jsonfile.writeFileSync(__dirname + '/../data/TESTING.json', jsonContent); //write back the stuff we changed


exports.getAdventure = function(req, res){
  try {

    var user = req.params.user;
    console.log(user + "HEYYY");
    for(var i = 0; i<jsonContent.users.length; i++){
       if(jsonContent.users[i].id === user){

         user = jsonContent.users[i];
         console.log(user);
         var name = req.params.name; //name from the route
         var adventureIndex = -1;
         for(var i = 0; i < user.adventures.length; i++){ //find the specific adventure
           if(user.adventures[i].name == name) {
             adventureIndex = i;
           }
         }
         //adventure does not exist yet
         if(adventureIndex == -1){
           res.send("Adventure does not exist yet");
         }
         //runs the adventure pug file!!!
         //assign adventureName to the name we receive in params
         res.render('adventure', {
           'adventureName': name,
           'user': user,
           'adventureContent': user.adventures[adventureIndex]
         });
      //runs the TravelLog pug file!!!
      //res.render('TravelLog', jsonContent); //data is our json file with all the data!!!
       }
    }

   //data is our json file with all the data!!!
  } catch (e) {
    next(e)
  }
};
