// get Json from file, save into var adventure


exports.ViewAdventure = function(req, res){
  try {
  	var fs = require("fs");
	var ad_content = fs.readFileSync("data/adventure_example.json");
	adventure = JSON.parse(ad_content)
    //renders (jade file, title you want to give it)
    console.log(req);
    res.render('view-adventure', adventure)

 } catch (e) {
    next(e)
  }
};


