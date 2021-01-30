println("b.js:start");
define([
	"module"
],function(
	module
){
	println("b.js:cb");
	//<@ println(42); @>
});
println("b.js:end");
