
define([
	"module",
	'es6!tests/es6/main'
],function(
	module,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(typeof(obj));
});
