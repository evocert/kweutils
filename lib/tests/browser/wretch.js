// A tiny (~ 3Kb g-zipped) wrapper built around fetch with an intuitive syntax. 
// A collection of middlewares is available through the wretch-middlewares package! 
//https://github.com/elbywan/wretch
define([
	"module",
	"wretch",
],function(
	module,
	wretch
){
	console.log([module.id,'start'].join(':'));
	console.log(wretch);
	{//basic usage
		/*
fetch("examples/example.json")
  .then(response => response.json())
  .then(json => {
    //Do stuff with the parsed json
  })
		 */
		// Use .res for the raw response, .text for raw text, .json for json, .blob for a blob ...
		wretch("./lib/data/json/test.json")
			.get()
			.json(function(json){
				console.log(json);
			})
	}
	{//error handling
		wretch("./lib/data/json/test.json")
			.get()
			.notFound(error => {})
			.unauthorized(error => {})
			.error(418, error => {})
			.res(response => {
				console.log(response);
			})
			.catch(error => {})
	}
	{//posting
		wretch("./lib/data/json/test.json")
			.post({ "hello": "world" })
			.res(function(response){
				console.log(response);
			});
	}
});
