define([
	"module",
	"./lib0/a.js",
	"./lib2/a.js"
],function(
	module,
	lib0a,
	lib2a
){
	println("module.id:"+module.id);
	println("module.uri:"+module.uri);
	//<@ println(42); @>
});
