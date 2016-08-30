var mongoose=require("mongoose");
var config=require("./config");

var dbaddress=config.dbAddress;
mongoose.connect(dbaddress);

var db=mongoose.connection;

db.on("error",function(error,data){
	console.log("error occured during connection establish");
});

db.once("open",function(error,callback){
	if(error)
		throw error;
	console.log("connection successfull establish");
});


module.exports=mongoose;