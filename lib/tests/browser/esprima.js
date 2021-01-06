//https://esprima.org/
//https://github.com/estools/escodegen
//https://github.com/estools/escodegen/wiki/API
//http://modularity.info/conference/2013/escodegen.html
//http://lisperator.net/pltut/compiler/js-codegen
//http://marqsm.github.io/blog/2014/08/13/using-esprima-to-process-javascript/
define([
	"module",
	"esprima",
	"estraverse",
	"escodegen",
],function(
	module,
	esprima,
	estraverse,
	escodegen
){
	console.log([module.id,'start'].join(':'));
	console.log(esprima);
	{
		console.log(esprima.parse("var answer = 34 + 8"));
	}
	{
		// VAL+VAL to translate to -> ADD(VAL,VAL);
		var src=
			"console.log(4+'foo');\n"+
			"console.log('foo'+2);\n"+
			"console.log('foo'+'bar');\n"+
			"console.log(4+2);\n"
			;
		//--------------------------------------------------------------------------------
		function replacePlusByADD(node) {
			// get operands from +
			var a=node.left,b=node.right;
			node.type="CallExpression";
			node.callee={
				"type":"Identifier",
				"name":"ADD"
			};
			node.arguments=[a,b];
			// reset unnecessary properties
			node.left=null;
			node.right=null;
			node.operator=null;
			return node;
		}
		var ast=esprima.parse(src);
		estraverse.traverse(ast,{
			enter: function(node){
				if (node.type==="BinaryExpression"){
					replacePlusByADD(node);
				}
			}
		});
		var tgt=escodegen.generate(ast);
		console.log(tgt);
		//--------------------------------------------------------------------------------
		function ADD(left,right){
			return [JSON.stringify(left),typeof(right)=='string'?right:JSON.stringify(right)].join(":");
		}
		eval(tgt);
		//--------------------------------------------------------------------------------
	}
});
