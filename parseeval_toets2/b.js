println("b.js:start");
define([
	"module"
],function(
	module
){
	println("b.js:cb:start");
	println("b.js:module.id:"+module.id);
	println("b.js:module.uri:"+module.uri);
	//<@ println(42); @>
});
println("b.js:end");
