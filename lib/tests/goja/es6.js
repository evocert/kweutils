
define([
	"module",
	"console",
	'es6!tests/es6/main'
],function(
	module,
	console,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(typeof(obj));
});