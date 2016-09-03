var fs=require('fs');

// var data="";

// fs.readFile("./app.js",{encoding:'utf-8'},(error,result)=>{
// 	if(error)
// 		throw error;
// 	else
// 		data=result;
// 	console.log("data=",data);
// });



function readFile(filename){
	return new Promise(function(resolve,reject){
		fs.readFile(filename,{encoding:'utf8'},(error,result)=>{
			if(error)
				reject(error);
			else
				resolve(result);
		});
	});
}

// readFile("./config.js").then(text=>{
// 	console.log("text=",text);
// }).catch(error=>{
// 	console.log("error occured=",error);
// });


// readFile("./config.js")
// .then(text=>{

// 	return "yep";
// })
// .then(function (value2) {
//     console.log("result=",value2); // 123
//     throw new Error("go to hell");
// }).catch(reason=>{
// 	console.log("error reason=",reason);
// });

var fileUrl=["./config.js","./app.js"];

var url=fileUrl.map(readFile);

Promise.all(url).then(texts=>{
	for(var i in texts){
		console.log("texts=",texts[i]);
	}

}).catch(error=>{
	console.log("Error occured during reading file=",error);
});