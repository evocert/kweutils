define([
	"module",
	"../lib1/a.js"
],function(
	module,
	lib1a
){
	println("module.id:"+module.id);
	println("module.uri:"+module.uri);
	//<@ println(42); @>
});
