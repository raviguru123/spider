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
"EAARt75qbg9wBADBK7C77HtTT10SGZAGOHmq0pJ1yJ2lADtzeQLZAV7hfj4I9d7jeSNx8PFhC4Vt4UNt8TcuF2ZCgkaHyHWN9YKJV855PlYJFt2x8cH7DvWBGqpCDsvMruOVn0eP5KGSotCtfuSAdy5iFZCouZBBXy1BYI81CkeAZDZD",
"EAACEdEose0cBAIiOEulXqJhesUOopuZC45Ao0XZAnueuTLziiTG7KNLu6DaF0Rj11bvPB0ycRi4wEAoDmq1j55rZCB2DL1MT4CVdybZBN617ZBrNZCMG2jlNBzCeYorYQROppMybWrgG8SnYMirqDo5r6s4HRqxg0sPFXVfHDfAQZDZD",
"EAACEdEose0cBANxnL0jDMosjmEOxDFUed9HpShwGtinGqwd7txmlkrly2TqMnN0dfGxBxZAvQ8CfYnAp6ww0ukx8LL4v0aznfWFo4Nz286cskD7OqjKSZCRZCzq22f8EHlZBux472gZAMd979o3rs2IKrky0Y2CzOkQZBy0X6CqgZDZD",
"EAACEdEose0cBAGziBVoz9P0IVhUJZCVIHRRd8LZB1QY8QZA3ocZBTVKKhKyOjzKm7zeAQpxV0cchMV01WuZC2m41E5XomCu10SBB7fRxTsVUnmeBxfM5wnwXaeTzgjc7pGoyW0ywhneZCHRzkZBdZCyB0vx0tNEYr5u7VHaqoBoZAAwZDZD",
"EAACEdEose0cBADBaDfaBRRZB3ohTM8uTrZCbwSrI939OZCAkZAXXSpH3hWCK3ZC4IFj1sUdundNdB1su12mLDswXsxuGJbmj8X8Utb2nA2DZAVfF63gZAgDePRrNVJxtr76b7zjtvDaQPFvym2qmalXNFS7nanpy8DTIZAXsZCe4f6aEbOg30LMUE",
"EAACEdEose0cBALOc4walfX7JBqGrl5Xc4wfUlVNDZBg7tlG04ZCwOaEbgLW7h5BJLXlXUemzliTxAdkeNuy1leh8zfsvkt6uJhvAsWIdeUYl4pbe2dQ3JU2V5HHtb0eaDmdk9ksGnmW5L41ZCiwLxixxQuj14SWOMCTFpYt0QZDZD"];
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