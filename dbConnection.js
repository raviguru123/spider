var mongoose=require("mongoose");

var dbaddress="mongodb://127.0.0.1:27017/fbdata";
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