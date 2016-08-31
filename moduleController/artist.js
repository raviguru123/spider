var httpCall=require("./httpCall");
var db=require("../dbmodule/artist");
var config=require("../config");


module.exports.init=function(){
	console.log("artist init function call");
	db.getAllData(callbackDataFunction);
}

var index=11378;
var arraydata = [];
var tokenArray=[
"EAACEdEose0cBAPx4DefAMBVcdkZBczFJq7dI3UsZCNbcBnw3yknt0Pn4vkPbSVEvSjf4ompZA0i06lFZB4R8pu0z7OeVYLZA1bEcaz1sbrikY9BFZAX91lrGSIYPJMuyFZBzYqAmoZB2jfLcScV9TuXyCFdhsXJ2hSjsMO1bDKc4zCts2DkqHu09",
"EAARt75qbg9wBADQOUmUKdL4dBk4IPsEs5fWO3Oe3TmC2XuJaWeNFSJWTYEhZAzyKZAZBx86sZAZCM5Fg3zJp9aqRJ3RKmxUoNMEiC0nJBvE1OZBZACyMqqeyBRZAuOcfRj9sXZAEHikeXLZBwWZAc7vkZB6fpfVHBVeOv5ibTvqqYZAGCZAgZDZD",
"EAACEdEose0cBAPTPdcSJyV2SZBpDcrsPZCRepnBlZBkRhrHAojOTgZAC7b9mbdh0Mwa2WSuYeBJieHIy5FCMEdSlM8gjoOkn9Q25ef4RdAxvDVnrrb4k3ZBlwORDiwUVlIHqbgVtY5vAVqXRz3g2v9J2q4ZCKq3kTMLpruM4BfUwZDZD",
"EAACEdEose0cBABaxb0Y7wWUp5ZAdgAVhHdC9JZCyOh0Va1jZA6gc2iphwJ0htwuollKMwC2sltGZA3hIG8A5DOy4lI1W2wNb1v3JMraUUMM1SsCIaCggXRde19aOXPvoc6T33V1XyobanEnxFZAy2Mit4eY0E5rZB71YawYNilSAZDZD",
"EAACEdEose0cBAC6OM02hapRpAKfgeGZBYqc2BEf4L9oGejXWkI2a54t1QP4bMxhkzecMTeZBGmQBdZAUZB7TjougG27Qwb9RXzNLGQf9CVbwJeBtyxjYrPdYKtmg6oLb8ZBB55mWob00tY7d4p1ld1qKVZBTYJlZCzE8ZCPUXjy7ZBQZDZD",
"EAACEdEose0cBAJnnyPTGxV4LTjiQV7fkszBDoXdCnOhRhWl4uHX4Rvbdstz3lYLZBqJ2NP76LCqQlu3CtLPIDXdsffJPg4G1n2L6zaV0paI8aMMQqk3N2XAahfn42e2bVwbjrWsSOYEdpd4ldI1ECNGBqTlNUda5clYjWYQZDZD"];
var size=0;
var startindexes=[0,5000,10000,15000,20000,25000];
function callbackDataFunction(array){
	size=parseInt(array.length/tokenArray.length);
	arraydata=array;
	for(var i=0;i<tokenArray.length;i++){
		hit(i,startindexes[i]);
	}
	
}

function hit(tokenIndex,index) {
	console.log("arraydata[index].get",arraydata[index].isset);
	if(index<startindexes[tokenIndex]+size){
		if(arraydata[index].isset=="0")
			httpCallforInfo(arraydata[index].id,tokenIndex,index);
		else{
			index++;
			hit(tokenIndex,index)
		}
	}
}
//db.artist.ensureIndex({error: 1, nodes: 1}, {unique: true, dropDups: true})


function httpCallforInfo(id,tokenIndex,index){
	var url=config.apiBaseUrl;
	url+="/"+id;
	url+="?access_token="+tokenArray[tokenIndex];
	url+="&fields=about%2Cid%2Caffiliation%2Cattire%2Cband_interests%2Cband_members%2Cawards%2Cartists_we_like%2Cbooking_agent%2Cbuilt%2Ccategory%2Ccategory_list%2Ccheckins%2Ccompany_overview%2Ccontact_address%2Ccountry_page_likes%2Ccover%2Cculinary_team%2Ccurrent_location%2Cdescription%2Cdescription_html%2Cbirthday%2Cbio%2Cemails%2Cengagement%2Cfan_count%2Ccan_post%2Cfeatures%2Cbest_page%2Cfounded%2Cgeneral_info%2Cgeneral_manager%2Cgenre%2Cglobal_brand_page_name%2Cfood_styles%2Chometown%2Chours%2Cinfluences%2Cis_always_open%2Cis_community_page%2Cis_permanently_closed%2Cis_published%2Cis_unclaimed%2Cis_verified%2Clink%2Clocation%2Cmembers%2Cmission%2Cname%2Cname_with_location_descriptor%2Cnetwork%2Cnew_like_count%2Coffer_eligible%2Cowner_business%2Cparent_page%2Cparking%2Cpayment_options%2Cpersonal_info%2Cpersonal_interests%2Cphone%2Cplace_type%2Cpress_contact%2Cprice_range%2Cproduced_by%2Cproducts%2Cpublic_transit%2Cschedule%2Csingle_line_address%2Cstart_info%2Cstore_location_descriptor%2Cstudio%2Ctalking_about_count%2Cusername%2Cvoip_info%2Cwebsite%2Cwere_here_count%2Cbusiness%2Cfeatured_video%2Cdisplay_subtext%2Cimpressum%2Clast_used_time%2Cmpg%2Crestaurant_services%2Crestaurant_specialties%2Cverification_status";
	//console.log("url=",url);
	setTimeout(httpCall.httpGetCall(url,artistDataSave,tokenIndex,index),3000);
}

function artistDataSave(data,tokenIndex,index){
	data.fbid = data.id;
	db.saveArtist(data,dbResponse);
	index++;
	hit(tokenIndex,index);
}

function dbResponse(result){
	//console.log("save=",result);
	db.updatebandData(result,updateflag);
}

function updateflag(result){
	console.log("update=",result);
}