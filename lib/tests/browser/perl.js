//in progres...
define([
	"module",
	"perljs",
],function(
	module,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	window.perl=obj;
});
