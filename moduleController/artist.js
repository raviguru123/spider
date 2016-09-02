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

"EAARt75qbg9wBAGWRck9sszqb9rJzrNYd3qcMNR3nPrNYdWYX9BJVhKFPLmvbyhyz1FkM2vkbAZAIqawAm7q7D1ZCvHe8yZBpu0MQuzWO9BgdZCaUF9g9eP6NI7Ec4d8m7xEdKD1ygcbvFnO7MWdUxtISJEZAZCDwZAJGWWayGcmAgZDZD",
"EAACEdEose0cBAMOopmj0irV6FVwyVydpNIU4xL7OxKYUEycvMF9QXHZAvXVQ3tlZBaBYrCsXE4G2f9WEWy6uUfcwl7uIdCwZCwUJxzZCsaZADn8iwIh4k2ZAURLu4qmBDTZClmACnEu3TL7WbjgTGu0zhLX1ZAOVpRAgOjxLPUjYBy66wYrppdnk",
"EAACEdEose0cBADnS3OJesCort4HplxOhdoAzoOPE2ZAMWEgoq67FoUUGLrJoRQKXZCZC3hWrnrcmcEN1ZBiTXZCgXL2AXVJiMT9oAtgy28PfmfyDX5AaUpVGqI0bapHqAqzhrYbuO8oZBnhmBc3Vwpt5mRB1ZBBeZCJ6MfK3P0OUypLimsL4qZAZCP",
"EAACEdEose0cBACZCu1pLoZCaFh6uAYkPGnuJVcykPtBtXKAIYMqmCQWQl9bWVwVwWu7WozrW3qqQxAKiQbtpxqeZC4oIbgZCDi9ARFoHHbaXR7WKCfMFv2jZBEsc3OHVxOpZBQNzdi7Y9YCPJnniJmdyI6NZAOTulG7kAWYYynKqj5mXFkz4utZC",
"EAACEdEose0cBAGSq8UlaEKUtKWZCZBLu29BUfjaICZBOu3trKEH4om06Ea8JRhKlpt96s9chyCGk97ZBe3iP1GRJDor6pCSpIPpJmc8uYbuBGGhvY7rWjc7ZB3JfRpP0Ew67IsZCgkCuiMEmGuaK44zreZA4rMUuIbihOeZCUmYXuj7moGjwCnmm"];
var size=0;
var startindexes=[];
function callbackDataFunction(array){

	size=parseInt(array.length/tokenArray.length);
	for(var i=0;i<tokenArray.length;i++){
		startindexes[i]=i*size;
	}

	for(var i=0;i<tokenArray.length;i++){
		startindexes[i]=i*size;
	}
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