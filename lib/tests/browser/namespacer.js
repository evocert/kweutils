//A simple library for creating namespaces in the browser
//https://github.com/sporto/namespacer.js
define([
	"module",
	"namespacer",
],function(
	module,
	Namespacer
){
	console.log([module.id,'start'].join(':'));
	console.log(Namespacer);
	{//basic usage
		// Create the namespace
		Namespacer('foo.bar.baz')
		// Use the namespace
		foo.bar.baz = {a: 1}
		// Pass an object directly
		Namespacer('foo.bar.baz', {a: 1});
		// Retrieve an object from a namespace, if it doesn't exist it will just return an empty object
		var a = Namespacer('foo.bar.baz');
	}
});
