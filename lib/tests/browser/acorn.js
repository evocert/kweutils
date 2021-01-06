//A tiny, fast JavaScript parser, written completely in JavaScript.
//https://github.com/acornjs/acorn
//https://www.digitalocean.com/community/tutorials/js-traversing-ast
//https://blog.bitsrc.io/build-a-js-interpreter-in-javascript-using-acorn-as-a-parser-5487bb53390c?gi=9b5dbc3501b4
define([
	"module",
	"acorn",
	"estraverse",
],function(
	module,
	acorn,
	estraverse,
){
	console.log([module.id,'start'].join(':'));
	console.log(acorn);
	window.acorn=acorn;
	var ast=acorn.parse(`
		function f0(){}
		function f1(){f0()}
		function f2(){f1();return 42;}
		var v0=4;
		var v1=2;
		var v2=42;
	`);
	console.log(ast);
	//iterate through functions
	console.log("Functions:");
	estraverse.traverse(ast,{
		enter: function(node){
			if (node.type==="FunctionDeclaration"){
				console.log(node.id.name);
			}
		}
	});
	console.log("Variables:");
	estraverse.traverse(ast,{
		enter: function(node){
			if (node.type==="VariableDeclaration"){
				console.log(node.declarations[0].id.name);
			}
		}
	});
});
