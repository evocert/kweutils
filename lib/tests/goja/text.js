define([
	'module',
	'console',
	'text!./text.js',
],function(module,console,val){
	console.log([module.id,'start'].join(':'));
	console.log(val);
});
