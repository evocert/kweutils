//https://github.com/estools/escodegen
//https://github.com/estools/escodegen/wiki/API
//http://modularity.info/conference/2013/escodegen.html
//http://lisperator.net/pltut/compiler/js-codegen
//http://marqsm.github.io/blog/2014/08/13/using-esprima-to-process-javascript/
//amd modifications made to lib/vendor/escodegen/2.0.0
//amd modifications made to lib/vendor/esutils/
//amd modifications made to lib/vendor/estraverse/
define([
	"module",
	"lodash",
	"escodegen",
],function(
	module,
	_,
	escodegen
){
	console.log([module.id,'start'].join(':'));
	var options={
		format:{
			indent:{
				style:'	',
				base:0,
				adjustMultilineComment:false
			},
			newline:'\n',
			space:' ',
			json:false,
			renumber:false,
			hexadecimal:false,
			quotes:'single',
			escapeless:false,
			compact:true,
			parentheses:true,
			semicolons:true,
			safeConcatenation:false
		},
		moz:{
			starlessGenerator:false,
			parenthesizedComprehensionBlock:false,
			comprehensionExpressionStartsWithAssignment:false
		},
		parse:null,
		comment:false,
		sourceMap:undefined,
		sourceMapRoot:null,
		sourceMapWithCode:false,
		file:undefined,
		//sourceContent:originalSource,
		directive:false,
		verbatim:undefined
	};
	src=escodegen.generate({
		type:'BinaryExpression',
		operator:'+',
		left:{type:'Literal',value:40},
		right:{type:'Literal',value:2}
	},options);
	console.log(src);
	console.log(escodegen.generate(
		{
			type:'Literal',
			value:200,'x-verbatim-property':'2e2'
		},
		_.merge(options,{ verbatim: 'x-verbatim-property' })
	));
	return;
});
