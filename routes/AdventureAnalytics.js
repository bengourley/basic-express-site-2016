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
         jsonContent.users[i].adventures.sort(function(a,b){
            var c = new Date(a.Date_Visited);
            var d = new Date(b.Date_Visited);
            return c-d;
         });

         var currentDate = new Date();
         var numDaysBetween = function(d1, d2){
            var d3 = new Date(d2.Date_Visited);
            var diff = Math.abs(d1.getTime() - d3.getTime());
            return diff/(1000*60*60*24);
         }
         console.log("check1");
         var thisWeek = [];
         var weekAnalytics = {adventureTime:0, totalVisits:0};
         var weekCounter = 0;
         for(var j = 0; j<jsonContent.users[i].adventures.length; j++){
            console.log(numDaysBetween(currentDate, jsonContent.users[i].adventures[j]));
            if(numDaysBetween(currentDate, jsonContent.users[i].adventures[j]) <= 7){
              thisWeek[weekCounter] = jsonContent.users[i].adventures[j];
              weekCounter++;
            }
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
         }
         console.log("321");
         weekAnalytics.adventureTime = parseInt(0);
         weekAnalytics.totalVisits = parseInt(0);
 console.log("123");
         for(var wi = 0; wi<thisWeek.length; wi++){
           weekAnalytics.adventureTime += parseInt(thisWeek[wi].Hours_Spent);
           weekAnalytics.totalVisits += parseInt(thisWeek[wi].Times_Visited);
         }  
     
         res.render('AdventureAnalytics', {title: 'AdventureAnalytics', user: jsonContent.users[i], highestRatedAd: highestRatedAdventures, mostVisited: mostAdventures, mostHours: mostHours, message: message, weekly: thisWeek, weekAnalytics: weekAnalytics});


       }
    }
  } catch (e) {
    next(e)
  }
};
