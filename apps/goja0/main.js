define([
	'module',
	'console',
	'cyclejs',
	'./lib/a',
	'./lib/foo/c',
	'env',
	'promise',
	'string',
	'alert',
	'console',
	'window',
//'document',
	'idutils',
	'pathutils',
	'pubsub',
	'request',
	'class',
//'classjs',
	'colorutils',
	'underscore',
	'lodash',
//'babel',
	'text',
	"babel-plugin-transform-remove-strict-mode",
	"babel-plugin-module-resolver",
//"es6",
//"jquery",
//"jquery-private",
	"d3",
	"d3-3d",
	"d3-array",
	"d3-collection",
	"d3-dispatch",
//"d3-request",
//"d3-scale-chromatic",
//"d3-selection",
	//"domino",
	"svg",
//"zest",
//"dygraphs",
],function(module,console,cycle,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_){
	println(module.id);
	println(JSON.stringify(cycle.decycle(requirejs.s.contexts._.defined),0,2));
	println(JSON.stringify(cycle.decycle(requirejs.s.contexts._.urlFetched),0,2));
	println(JSON.stringify(cycle.decycle(requirejs.s.contexts._.config),0,2));
	console.log(module.id);
});
