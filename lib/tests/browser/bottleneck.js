//Bottleneck is a lightweight and zero-dependency Task Scheduler and Rate Limiter for Node.js and the browser.
//https://github.com/SGrondin/bottleneck
define([
	"module",
	"bottleneck",
],function(
	module,
	Bottleneck
){
	console.log([module.id,'start'].join(':'));
	console.log(Bottleneck);
	{//basic usage
		const limiter=new Bottleneck({
			maxConcurrent:1,
			minTime:333
		});
		limiter.schedule(
			function(){return new Promise(function(resolve,reject){
				resolve([4,2]);
			})}
		).then(
			function(result){
				console.log(result);
			}
		);
	}
	{//wrap function
		const limiter=new Bottleneck({
			maxConcurrent:1,
			minTime:333
		});
		function myFunction(arg1,arg2){
			console.log(arg1,arg2);
			return [arg1*2,arg2*3];
		}
		const wrapped=limiter.wrap(myFunction);
		wrapped(4,2).then((result) => {
			console.log(result);
		});
	}
});
