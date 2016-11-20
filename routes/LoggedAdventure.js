var jsonfile = require('jsonfile'); //so we can easily write to json
jsonfile.spaces = 4; //so when we write to jsonfile it formats
var filepath = __dirname + "/../data/data.json";
jsonContent = jsonfile.readFileSync(filepath); //read file and put as json object

exports.LoggedAdventure = function(req, res){
  try {
    //renders (jade file, title you want to give it)

    var user = req.params.user;
    var lat = req.params.lat;
    var lng = req.params.lng;
    for(var i = 0; i<jsonContent.users.length; i++){
       if(jsonContent.users[i].id === user){

         res.render('logged-adventure', {lat: lat, lng:lng, title: 'Logged Adventure', user: jsonContent.users[i], values: []});
       }
    }
 } catch (e) {
    next(e)
  }
};


exports.Submit = function(req, res) {
  console.log(req.params.user);
  var user;
  //console.log(req.file)
  for(var i = 0; i<jsonContent.users.length; i++){
       if(jsonContent.users[i].id === req.params.user){
          req.body["image"] = req.file.originalname;
          jsonContent.users[i].adventures[jsonContent.users[i].adventures.length] = req.body; //go to next available spot
          jsonContent.users[i].adventures[jsonContent.users[i].adventures.length-1].lat = req.params.lat; //go to next available spot
          jsonContent.users[i].adventures[jsonContent.users[i].adventures.length-1].lng = req.params.lng; //go to next available spot
          jsonfile.writeFileSync(__dirname + '/../data/data.json', jsonContent);
       }
  }
  res.redirect('/adventure/' + req.params.user + '/'+req.body.name)
  //res.redirect('/Home');
};

exports.LoggedAdventureEdit = function(req, res){
  try {
    //renders (jade file, title you want to give it)

    var user = req.params.user;
    var lat = req.params.lat;
    var lng = req.params.lng;
    var exists = false;
    var values;
    for(var i = 0; i<jsonContent.users.length; i++){
       console.log("wow");
       console.log(user + "!");
       if(jsonContent.users[i].id === user){
         for(var j=0; j<jsonContent.users[i].adventures.length; j++){
             if(jsonContent.users[i].adventures[j].lat === lat && jsonContent.users[i].adventures[j].lng === lng){
               exist = true;
               values = jsonContent.users[i].adventures[j];  
             }
         }
         res.render('logged-adventure', {lat: lat, lng:lng, title: 'Logged Adventure', user: jsonContent.users[i], exists: exist, values: values});


       }
    }
 } catch (e) {
    next(e)
  }
};


exports.SubmitEdit = function(req, res) {
  console.log(req.params.user);
  console.log("CHECKING123");
  req.body.image = "http://lorempixel.com/600/200/?random=" + Math.round(Math.random()*100); //generate random image to display
  var user;
  for(var i = 0; i<jsonContent.users.length; i++){
       console.log("REPTAR");
       console.log(jsonContent.users[i].id + "!!");
       if(jsonContent.users[i].id === req.params.user){
         console.log("check1"); 
         for(var j = 0; j<jsonContent.users[i].adventures.length; j++){
            if(jsonContent.users[i].adventures[j].lat === req.params.lat && jsonContent.users[i].adventures[j].lng === req.params.lng){
              console.log("EDITINGADVENTURE!");
              jsonContent.users[i].adventures[j] = req.body; //go to next available spot
              jsonContent.users[i].adventures[j].lng = req.params.lng; //go to next available spot
              jsonContent.users[i].adventures[j].lat = req.params.lat; //go to next available spot
              jsonfile.writeFileSync(__dirname + '/../data/data.json', jsonContent);
            }
          }
       }
  }
  res.redirect('/adventure/' + req.params.user + '/'+req.body.name)
  //res.redirect('/Home');
};

