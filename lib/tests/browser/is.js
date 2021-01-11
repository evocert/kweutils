//This is a general-purpose check library.
//https://github.com/arasatasaygin/is.js
define([
	"module",
	"isjs",
],function(
	module,
	is
){
	console.log([module.id,'start'].join(':'));
	console.log(is);
	{//basic usage
		var getArguments = function() {
		    return arguments;
		};
		var arguments = getArguments();
		console.log(is.arguments(arguments));
		console.log(is.not.arguments({foo: 'bar'}));
		console.log(is.all.arguments(arguments, 'bar'));
		console.log(is.any.arguments(['foo'], arguments));
		// 'all' and 'any' interfaces can also take array parameter
		console.log(is.all.arguments([arguments, 'foo', 'bar']));
	}
});
