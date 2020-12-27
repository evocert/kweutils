define(["module","console"],function(module,console){
	console.log([module.id,'start'].join(':'));
	console.log(JSON.stringify(requirejs.s.contexts._.config ))
	//tests
	require([
		"tests/goja/underscore",
		"tests/goja/lodash",
		"tests/goja/text",
		"tests/goja/babel",
		"tests/goja/alert",
		"tests/goja/classjs",
		"tests/goja/console",
		//"tests/goja/db",
		"tests/goja/html",
		//"tests/goja/pathutils",
		//"tests/goja/promise",
		//"tests/goja/pubsub",
		//"tests/goja/request",
		"tests/goja/es6",
		"tests/goja/domino",
		"tests/goja/envjs",
	],function(){});
});

