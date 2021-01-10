//A simple control-flow library for node.JS that makes parallel execution, serial execution, and error handling painless.
//https://github.com/creationix/step/
define([
	"module",
	"step",
],function(
	module,
	Step
){
	console.log([module.id,'start'].join(':'));
	console.log(Step);
	{//basic usage
		Step(
			function step0(err){
				return new Promise(function(resolve,reject){window.setTimeout(function(){console.log(0);resolve(0);},100);});
			},
			function step1(err,val){
				console.log(err);
				console.log(val);
				if(err)throw err;
				return new Promise(function(resolve,reject){window.setTimeout(function(){console.log(1);resolve(1);},100);});
			},
			function step2(err,val){
				console.log(err);
				console.log(val);
				if(err)throw err;
				throw 42;
				return new Promise(function(resolve,reject){window.setTimeout(function(){console.log(2);resolve(2)},100);});
			},
			function step3(err,val){
				console.log(err);
				console.log(val);
				if(err)throw err;
				return new Promise(function(resolve,reject){window.setTimeout(function(){console.log(3);resolve(3);},100);});
			},
			function step3(err,val){
				console.log(err);
				console.log(val);
				if(err)throw err;
				console.log("done");
			},
		);
	}
});
