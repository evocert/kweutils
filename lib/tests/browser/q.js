//If a function cannot return a value or throw an exception without blocking, it can return a promise instead. A promise is an object that represents the return value or the thrown exception that the function may eventually provide. A promise can also be used as a proxy for a remote object to overcome latency.
//see also promises of  jQuery, Dojo, When.js, WinJS, and more. microjs/q
//see also http://microjs.com
//https://github.com/kriskowal/q
define([
	"module",
	"q",
],function(
	module,
	Q
){
	console.log([module.id,'start'].join(':'));
	console.log(Q);
	{//sync usage
		var tid="test0";
		Q.fcall
		     (function(){console.log([tid,"start"].join(":"));})
		.then(function(){console.log([tid,0].join(":"));})
		.then(function(){console.log([tid,1].join(":"));})
		.then(function(){console.log([tid,2].join(":"));})
		.then(function(){console.log([tid,3].join(":"));})
		.then(function(v){
			console.log([tid,"done"].join(":"))
			console.log(v);
		})
		.catch(function (e) {
			console.error(e);
		})
		.done();
	{//async usage
	{
		var tid="test1";
		Q.fcall
		     (function(){return new Promise(function(resolve,reject){console.log([tid,"start"].join(":"));resolve()});})
		.then(function(){return new Promise(function(resolve,reject){console.log([tid,0].join(":"));resolve()});})
		.then(function(){return new Promise(function(resolve,reject){console.log([tid,1].join(":"));resolve()});})
		.then(function(){return new Promise(function(resolve,reject){console.log([tid,2].join(":"));resolve()});})
		.then(function(){return new Promise(function(resolve,reject){console.log([tid,3].join(":"));resolve()});})
		.then(function(v){
			console.log([tid,"done"].join(":"))
			console.log(v);
		})
		.catch(function (e) {
			console.error(e);
		})
		.done();
	}
});
