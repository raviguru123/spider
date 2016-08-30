var httpCall=require("./httpCall");
var db=require("../dbmodule/dj");
var config=require("../config");
var index=0;

module.exports.init=function(){
	var url=config.apiBaseUrl;
	url+="/search?access_token="+config.access_token;
	urlConfiguration(url);
}
function combineArray(array){

}


function urlConfiguration(baseUrl){
	var query="dj";
	var type="page";
	// var url=baseUrl+"&q="+query+"&type="+type;
	// httpCallFunction(url);
	var array1=["rental","orchestra","photo","image","photographer","illusionist","magician","party planner","wedding","planner","wedding planner","variety artist","special","style makeup","makeup","style","hair style","dancer","comic artist","singer","anchor","event planner","caterers","music","pub","night","party spot","party place","night club","club","bar","lounge","ladies night","restaurant","singer","hotel","hotel"];
	var array=['abc','bb','cd','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	if(index<array1.length){
		var url=baseUrl+"&q="+array1[index]+"&type="+type+"&category=Musician/Band";
		httpCallFunction(url);
	}
	
}

function httpCallFunction(url){
	setTimeout(httpCall.httpGetCall(url,dataParsing),3000);
}

var count=0;

function dataParsing(array){
	console.log("data=",array);

	if(array.data!=undefined){
		for(var i=0;i<array.data.length;i++){
			db.saveDj(array.data[i],dbResponse);
		}
		count+=array.data.length;
		console.log("count=",count,index);
	}

	if(array.paging!=undefined&&array.paging.next!=undefined){
		httpCallFunction(array.paging.next);
	}

	else{
		console.log("next is undefined");
		var url=config.apiBaseUrl;
		url+="/search?access_token="+config.access_token;
		index++;
		urlConfiguration(url);
	}
}

function dbResponse(result){

}