var httpCall=require("./httpCall");
var db=require("../dbmodule/dj");
var config=require("../config");

console.log("access_token=",config.access_token);

module.exports.init=function(){
	console.log("init function in dj file called");
}

