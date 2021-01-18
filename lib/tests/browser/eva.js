//Functions to create and call functions and evaluate expressions.
//https://github.com/gamtiq/eva
define([
	"module",
	"eva",
],function(
	module,
	eva
){
	console.log([module.id,'start'].join(':'));
	console.log(eva);
	{//basic usage
		var func = eva.createFunction("(a || 0) + (b || 0) + (c || 0)", {paramNames: "a, b, c", expression: true});
		console.log(func("abc"));   // abc00
		console.log(func(10, 1, 5, 8));   // 16

		func = eva.createFunction("if (obj.b) {return a + b;} else {return 'a=' + a;}", {scope: true, paramNames: "obj"});
		console.log( func({a: "a", b: "bc"}) );   // abc

		console.log( eva.evalWith("this.a + this.b", {a: 1, b: 9}) );   // 10
		console.log( eva.evalWith("fn(this.expr)", {expr: "Math.sin(0)"}, {fn: eva.evalWith}) );   // 0

		var obj = {};
		eva.createDelegateMethod(eva, "evalWith", {destination: obj, destinationMethod: "expr"});
		console.log( obj.expr("Math.cos(0)") );   // 1

		func = eva.closure(eva.evalWith, ["this.a * this.b"]);
		console.log( func({a: 4, b: 7}) );   // 28
		console.log( func({a: -3, b: 5}) );   // -15

		func = eva.closure(eva.evalWith, [{a: 3, b: -9}], null, {prependArgs: true});
		console.log( func("this.a + this.b") );   // -6
		console.log( func("this.a - this.b") );   // 12

		var funcList = [
		    eva.closure(eva.evalWith, ["this.a + this.b"]),
		    eva.closure(eva.evalWith, ["this.a * this.b"]),
		    eva.closure(eva.evalWith, ["Math.max(this.a, this.b)"])
		];
		console.log( eva.map(funcList, [{a: 2, b: -7}]) );   // [-5, -14, 2]
	}
});
