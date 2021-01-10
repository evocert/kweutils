//Bluebird is a fully featured promise library with focus on innovative features and performance
//https://github.com/petkaantonov/bluebird/
//http://bluebirdjs.com/docs/getting-started.html
//https://devhints.io/bluebird
//https://www.guru99.com/bluebird-promises.html
define([
	"module",
	"bluebird",
],function(
	module,
	BlueBird
){
	console.log([module.id,'start'].join(':'));
	console.log(BlueBird);
	{//all
		BlueBird.all([new Promise(function(resolve,reject){resolve(0);}),new Promise(function(resolve,reject){resolve(1);})])
		.then(function(results){
			console.log(results[0]);
			console.log(results[1]);
		})
	}
});
