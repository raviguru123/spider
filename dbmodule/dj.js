var mongoose=require("../dbConnection");

var djSchema=mongoose.Schema({
	id:String,
	name:String
});


var dj=mongoose.model("band",djSchema,"band");
module.exports.saveDj=function(data,callback){
	var djData=new dj(data);
	djData.save(function(error,result){
		if(error){
			
		}
		else{
		callback(result);	
		}
		
	});
}