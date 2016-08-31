var https=require("https");
var http=require("http");

module.exports.httpGetCall=function(url,callback,tokenIndex,index){
	https.get(url,function(response){
		var str="";
		response.on("data",function(chunk){
			str+=chunk;
		});
		response.on("end",function(){
			str=JSON.parse(str);
			//console.log("ERROR=",str.error);
			if(str.error==undefined){
				callback(str,tokenIndex,index);
			}
			
		});
		response.on("error",function(error){
			console.log("error occured");
		})
	});
}


module.exports.httpPostCall=function(url,data,callback){
	http.post(url,data,function(response){
		var str="";
		response.on("data",function(chunk){
			str+=chunk;
		});

		response.on("end",function(){
			str=JSON.parse(str);
			callback(str);
		});
	});
}