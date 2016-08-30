var express=require("express"),
bodyParser=require("body-parser"),
config=require("./config"),
artist=require("./moduleController/artist"),
dj=require("./moduleController/dj"),
band=require("./moduleController/band"),
category=require("./moduleController/category");



var app=express();

artist.init();
//dj.init();
//band.init();
//category.init();

app.listen(config.port,function(){
	console.log("server is running in port",config.port);
});



