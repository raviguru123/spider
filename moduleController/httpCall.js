var https=require("https");
var http=require("http");

module.exports.httpGetCall=function(url,callback,tokenIndex,index){

try{
	https.get(url,function(response){
		var str="";

		response.on("data",function(chunk){
			str+=chunk;
		});
		response.on("end",function(){
			console.log("yes here is work123",str);
			try{
			str=JSON.parse(str);
			}
			catch(e){
				callback(str,tokenIndex,index,1);
			}

			//console.log("ERROR=",str.error);
			if(str.error==undefined){
				callback(str,tokenIndex,index,0);
			}
			
		});
		response.on("error",function(error){
			console.log("error occured");
		})
	});
}
catch(e){
	callback(str,tokenIndex,index,1);
}
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