define([
	"module",
	"jquery"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	window.asdf=$;
});