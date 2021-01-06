//https://github.com/WasabiFan/cdecl-blocks-js/releases/tag/v1.0.0-emscripten
define([
	"module",
	"cdecl",
],function(
	module,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	//Module.callMain(["--version"]) ??? see perljs
});
