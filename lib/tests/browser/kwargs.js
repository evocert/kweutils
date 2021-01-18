//Keyword arguments for Javascript. Similar to python's kwargs
//This little tool gives you the ability to use keyword arguments support for your functions. So you can either specify each argument as you wish or use the arguments regularly. In fact you can do both at the same time.
//Another feature is to have the ability to set default values for your function arguments without changing or adding any code to your function.
//https://github.com/serkanyersen/kwargsjs
//note:modified ./lib/vendor/kwargsjs
define([
	"module",
	"kwargsjs",
],function(
	module,
	kwargs
){
	console.log([module.id,'start'].join(':'));
	console.log(kwargs);
	{//basic usage
		var test = function(arg1, arg2, arg3){
			console.log([arg1,arg2,arg3].join(","));
			// Your code
		}.kwargs();
		test({
			arg3: 'val3',
			arg1: 'val1',
			arg2: 'val2'
		});
	}
});
