var httpCall=require("./httpCall");
var db=require("../dbmodule/artist");
var config=require("../config");


module.exports.init=function(){
	console.log("artist init function call");
	db.getAllData(callbackDataFunction);
}

var index=1595;
var arraydata = [];
function callbackDataFunction(array){
	//console.log("length of data=",array[0]);
	arraydata = array;
	hit();
}

function hit() {
	if(index<arraydata.length){
		httpCallforInfo(arraydata[index].id);
	}
}

function httpCallforInfo(id){
	var url=config.apiBaseUrl;
	url+="/"+id;
	url+="?access_token="+config.access_token;
	url+="&fields=category,about,name,category_list";
	//console.log("url=",url);
	setTimeout(httpCall.httpGetCall(url,artistDataSave),3000);
}

function artistDataSave(data){
	db.saveArtist(data,dbResponse);
	index++;
	hit();
}

function dbResponse(result){
	console.log("save=",result);
}
