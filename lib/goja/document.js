define([
	"require",
	"exports",
	"module",
	"window"
],function(
	require,
	exports,
	module,
	window
){
	console.Log("goja:document");
	//exports.window=window;
	exports.document=window.document;
	return window.document;
})
