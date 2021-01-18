//A handwritten msgpack encoder and decoder for Browsers
//This is a browser port of https://github.com/creationix/msgpack-js
//The original format can be found at http://wiki.msgpack.org/display/MSGPACK/Format+specification
//https://github.com/creationix/msgpack-js-browser
//note:modified lib/vendor/msgpack-js-browser
define([
	"module",
	"msgpack-js-browser"
],function(
	module,
	msgpack
){
	console.log([module.id,'start'].join(':'));
	console.log(msgpack);
	{//basic usage
		var initial = {Hello: "World"};
		var encoded = msgpack.encode(initial);
		var decoded = msgpack.decode(encoded);
		console.log(initial);
		console.log(encoded);
		console.log(decoded);
	}
});
