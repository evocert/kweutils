//https://github.com/douglascrockford/JSLint
define([
	"module",
	"jslint",
],function(
	module,
	jslint
){
	console.log([module.id,'start'].join(':'));
	console.log(jslint);
	var stat=jslint(`
		function f0(){}
		function f1(){}
		function f2(){}
		var v0=4;
		var v1=2;
	`);
	console.log(stat);
});
