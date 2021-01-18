//offers foolproof deep cloning of objects, arrays, numbers, strings, maps, sets, promises, etc. in JavaScript.
//https://github.com/pvorb/clone
define([
	"module",
	"clone",
],function(
	module,
	clone
){
	console.log([module.id,'start'].join(':'));
	console.log(clone);
	{//basic usage
		var a, b;

		a = { foo: { bar: 'baz' } };  // initial value of a

		b = clone(a);                 // clone a -> b
		a.foo.bar = 'foo';            // change a

		console.log(a);               // show a
		console.log(b);               // show b
	}
});
