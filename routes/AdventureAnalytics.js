var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object
//jsonContent.adventures[1].name = "no";  //go to adventures[1].name = Testtingg
jsonfile.writeFileSync(__dirname + '/../data/TESTING.json', jsonContent); //write back the stuff we changed


exports.AdventureAnalytics = function(req, res){
  try {
    var user = req.params.user;
    for(var i = 0; i<jsonContent.users.length; i++){
       if(jsonContent.users[i].id === user){
         var highestRatedAdventures = [];
         var mostAdventures = [];
         var highestRating = 0;
         var highestVisit = 0;
         var mostHours = [];
         var highestHours = 0;
         var message;
         for(var j = 0; j<jsonContent.users[i].adventures.length; j++){
            if(parseInt(jsonContent.users[i].adventures[j].Rating) > highestRating){
              highestRating = jsonContent.users[i].adventures[j].Rating;
              highestRatedAdventures = [];
              highestRatedAdventures[0] = jsonContent.users[i].adventures[j].name;
            }  
            else if(jsonContent.users[i].adventures[j].Rating ===  highestRating ){
              highestRatedAdventures[highestRatedAdventures.length] = jsonContent.users[i].adventures[j].name;
            }
            if(parseInt(jsonContent.users[i].adventures[j].Times_Visited) > highestVisit){
              highestVisit = jsonContent.users[i].adventures[j].Times_Visited;
              mostAdventures = [];
              mostAdventures[0] = jsonContent.users[i].adventures[j].name;
            }  
            else if(jsonContent.users[i].adventures[j].Times_Visited ===  highestVisit ){
              mostAdventures[mostAdventures.length] = jsonContent.users[i].adventures[j].name;
            }
            if(parseInt(jsonContent.users[i].adventures[j].Hours_Spent) > highestHours){
              highestHours = jsonContent.users[i].adventures[j].Hours_Spent;
              mostHours = [];
              mostHours[0] = jsonContent.users[i].adventures[j].name;
            }  
            else if(jsonContent.users[i].adventures[j].Hours_Spent ===  highestHours ){
              mostHours[mostHours.length] = jsonContent.users[i].adventures[j].name;
            }

            if(jsonContent.users[i].adventures.length < 10){
              message = "Oh No! You've gone on less than 10 adventures, you should go out more!";
            }
            else { message = "You've logged more than 10 adventures, look at you ;)!";}
            console.log(jsonContent.users[i].adventures.length + "%%%%");
         }

         
         res.render('AdventureAnalytics', {title: 'AdventureAnalytics', user: jsonContent.users[i], highestRatedAd: highestRatedAdventures, mostVisited: mostAdventures, mostHours: mostHours, message: message});


       }
    }
  } catch (e) {
    next(e)
  }
};
