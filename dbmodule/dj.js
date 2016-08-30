var mongoose=require("../dbConnection");

var djSchema=mongoose.Schema({
	id:{type:String,unique:true},
	name:{typr:String,unique:true}
});

var dj=mongoose.model("dj",djSchema,"dj");

module.exports.saveDj=function(data,callback){
	var djData=new dj(data);
	djData.save(function(error,result){
		if(error)
			throw error;
		callback(result);
	})
}