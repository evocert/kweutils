define([
	"module",
	"numeric",
],function(
	module,
	numeric	
){
	console.log([module.id,'start'].join(':'));
	console.log(numeric);
	numeric.largeArray = 2; A = numeric.identity(4)
	console.log(A);
});
