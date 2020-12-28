define([
	"module",
	"console",
	"vendor/domino/index"
],function(
	module,
	console,
	domino
){
	console.log([module.id,'start'].join(':'));
	console.log(typeof(domino));
	window = domino.createWindow('');
	document = window.document;
	console.log(Object.keys(window));
	console.log(Object.keys(document));
});
