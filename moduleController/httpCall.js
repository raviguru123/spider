var https=require("./https");
var http=require("http");
module.exports.httpGetCall=function(url,callback,ishttp=true){
	https.get(url,function(response){
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

module.exports.httpPostCall=function(url,data,callback){
	http.post(url,data,function(response){
		var str="";
		response.on("data",function(chunk){
			str+=chunk;
		});

		response.on("end",function(){
			str=JSON.parse(str);
			callback(str);
		})
	})
}