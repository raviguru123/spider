var mongoose=require("../dbConnection");

var artistSchema=mongoose.Schema({}, { strict: false });


var artist=mongoose.model("artist",artistSchema,"artist");
module.exports.saveArtist=function(data,callback){
	var artistData=new artist(data);
	artistData.save(function(error,result){
		if(error){
			
		}
		else{
			callback(result);	
		}
	});
}

var bandSchema2321=mongoose.Schema({
	name:String,
	id:String,
	isset:Number
});
var band=mongoose.model("band2323",bandSchema2321,"band");
module.exports.getAllData=function(callback){

	band.find({},function(error,result){
		if(error)
		{
			console.log("error occured");
		}
		console.log("result",result);
		callback(result);
	});

}



module.exports.updatebandData=function(data,callback){
	band.find({id:data.fbid},function(error,result){
		if(error)
			throw error;
		console.log("before result=",result);
		result[0].isset="1";
		result[0].id=data.fbid;
		result[0].name=data.name;
		console.log("result=",result);
		result[0].save(function(error,result){
			if(error)
				console.log("error occured during update",error);
			callback({
				message:"successfully update result",
				result:result
			});
		})
	})
}

//https://graph.facebook.com/v2.7/".$userid."?fields=about%2Cid%2Caffiliation%2Cattire%2Cband_interests%2Cband_members%2Cawards%2Cartists_we_like%2Cbooking_agent%2Cbuilt%2Ccategory%2Ccategory_list%2Ccheckins%2Ccompany_overview%2Ccontact_address%2Ccountry_page_likes%2Ccover%2Cculinary_team%2Ccurrent_location%2Cdescription%2Cdescription_html%2Cbirthday%2Cbio%2Cemails%2Cengagement%2Cfan_count%2Ccan_post%2Cfeatures%2Cbest_page%2Cfounded%2Cgeneral_info%2Cgeneral_manager%2Cgenre%2Cglobal_brand_page_name%2Cfood_styles%2Chometown%2Chours%2Cinfluences%2Cis_always_open%2Cis_community_page%2Cis_permanently_closed%2Cis_published%2Cis_unclaimed%2Cis_verified%2Clink%2Clocation%2Cmembers%2Cmission%2Cname%2Cname_with_location_descriptor%2Cnetwork%2Cnew_like_count%2Coffer_eligible%2Cowner_business%2Cparent_page%2Cparking%2Cpayment_options%2Cpersonal_info%2Cpersonal_interests%2Cphone%2Cplace_type%2Cpress_contact%2Cprice_range%2Cproduced_by%2Cproducts%2Cpublic_transit%2Cschedule%2Csingle_line_address%2Cstart_info%2Cstore_location_descriptor%2Cstudio%2Ctalking_about_count%2Cusername%2Cvoip_info%2Cwebsite%2Cwere_here_count%2Cbusiness%2Cfeatured_video%2Cdisplay_subtext%2Cimpressum%2Clast_used_time%2Cmpg%2Crestaurant_services%2Crestaurant_specialties%2Cverification_status&access_token=".$token;