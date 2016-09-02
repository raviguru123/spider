var httpCall=require("./httpCall");
var db=require("../dbmodule/dj");
var config=require("../config");
module.exports.init=function(){
	var url=config.apiBaseUrl;
	// url+="/search?access_token="+config.access_token;
	// urlConfiguration(url);
	for(var i=0;i<tokenArray.length;i++){
		urlConfiguration(url+"/search?access_token="+tokenArray[i],i,0);
	}
}
function combineArray(array){

}
var tokenArray=[
"EAACEdEose0cBAFKjaP79jjYtleYFuxDFRWMmYujTdYELbjraV28oRVCP7hOqD4CBeRZC9bCnFLVYWSVKVmugKsh5IzbC4Iufg5GJDItoguuhH6ZAcHwPjM22k7Lgn6ZA08NZCZCjPwCS1CijZBdZCEyK48thvC3eZCEGDKQxdn0cogZDZD",
"EAACEdEose0cBALnxMFU6Jh2aBwtQlAg4xRB9vdx4LYMNT1ggZCMwipTBAew6t5e6JULkZBBQ07KcTq6eIsRMVIx2XN1eBCSIXTaKu9E9rDqr29clnovCrPMilahoDSaYCMEbWW2GIoDJfOghRwRo07HtkzZAsRBRU4nj5ZCQZB5W6Jne2BUSz",
"EAACEdEose0cBABChXUYG3ZCbv8DhjaIQAjZBMSp97syn0ICpF9wlMPX03phLeG5Tu1boFHEryok3W2rHzxl3neYMFrYZCYb5ErW8FlpP8ARASMAsUmAsrqcsqO24BJC2M95lfU5pIx0y8gz0prC6JSyHBVKdFUhHo4e1lPsmwZDZD"
];
var array2=[
"Musician/Band",
"Band",
"DJs",
"Artists",
"Musician",
"Artist",
"DJ",
"Djs&Artists",
"Artists & DJs",
"Dancer – Artists",
"Producer – Artists & DJs",
"Dancer – Artists",
"All-female band",
"Big band",
"Boy band",
"Christian band",
"Church band",
"Concert band",
"Cover band",
"Dansband",
"Fife and drum",
"Garage rock band",
"Girl group",
"Family band",
"Jam band",
"Jazz band",
"Jug band",
"Klezmer band",
"Marching band",
"Military band",
"Orchestra",
"Organ trio",
"Rock band",
"Rock Supergroup",
"School band",
"Marching band",
"Ska band",
"Tribute act",
"Worship band",
"GENRE",
"Breaks dj",
"Chill Out dj",
"Drum & Bass dj",
"Dubstep dj",
"Electro House dj",
"Electronica dj",
"Funk / R&B dj",
"Hard Dance dj",
"Hardcore / Hard dj",
"Techno dj",
"Hip-Hop dj",
"House dj",
"Indie Dance / Nu dj",
"Disco dj",
"Minimal dj",
"Open Format",
"progressive house",
"Psy-Trance",
"Reggae / Dub",
"Tech House",
"Techno",
"trance",
"trap"
];

function urlConfiguration(baseUrl,tokenIndex,index){
	var query="dj";
	var type="page";
		// var url=baseUrl+"&q="+query+"&type="+type;
	// httpCallFunction(url);
	var array1=["rental","orchestra","photo","image","photographer","illusionist","magician","party planner","wedding","planner","wedding planner","variety artist","special","style makeup","makeup","style","hair style","dancer","comic artist","singer","anchor","event planner","caterers","music","pub","night","party spot","party place","night club","club","bar","lounge","ladies night","restaurant","singer","hotel","hotel"];
	//var array=['abc','bb','cd','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	if(index<array2.length){
		var url=baseUrl+"&q="+array2[index]+"&type=page";
		httpCallFunction(url,tokenIndex,index);
	}
	
}

function httpCallFunction(url,tokenIndex,index){
	setTimeout(httpCall.httpGetCall(url,dataParsing,tokenIndex,index),3000);
}

var count=0;

function dataParsing(array,tokenIndex,index,error){
	console.log("data=",array);

	if(array.data!=undefined){
		for(var i=0;i<array.data.length;i++){
			db.saveDj(array.data[i],dbResponse);
		}
		count+=array.data.length;
		console.log("count=",count,index);
	}

	if(array.paging!=undefined&&array.paging.next!=undefined){
		httpCallFunction(array.paging.next,tokenIndex,index);
	}

	else{
		console.log("next is undefined");
		var url=config.apiBaseUrl;
		url+="/search?access_token="+tokenArray[tokenIndex];
		index++;
		urlConfiguration(url,tokenIndex,index);
	}
}

function dbResponse(result){

}