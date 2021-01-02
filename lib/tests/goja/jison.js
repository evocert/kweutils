//https://github.com/zaach/jison
//https://github.com/zaach/jison/tree/master/examples
//https://github.com/zaach/jison
//http://zaa.ch/jison/docs/
define([
	"module",
	"console",
	"cyclejs",
	"jison",
],function(
	module,
	console,
	cyclejs,
	Jison	//*note: issue with global Jison
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Jison));
	{
		var basic=
"%%\n\
\n\
E\n\
    : E PLUS T\n\
    | T\n\
    ;\n\
\n\
T\n\
    : ZERO\n\
    ;"
		var code=Jison.Generator(basic)
		console.log(cyclejs.decycle(code));
	}
	{
		// mygenerator.js
		var Parser = require("jison").Parser;

		// a grammar in JSON
		var grammar = {
		    "lex": {
			"rules": [
			   ["\\s+", "/* skip whitespace */"],
			   ["[a-f0-9]+", "return 'HEX';"]
			]
		    },

		    "bnf": {
			"hex_strings" :[ "hex_strings HEX",
					 "HEX" ]
		    }
		};

		// `grammar` can also be a string that uses jison's grammar format
		var parser = new Parser(grammar);

		// generate source, ready to be written to disk
		var parserSource = parser.generate();

		// you can also use the parser directly from memory

		try{
			// returns true
			parser.parse("adfe34bc e82a");
		}catch(e){
			console.error(e.toString);
		}
		try{
			// throws lexical error
			parser.parse("adfe34bc zxg");
		}catch(e){
			console.error(e.toString());
		}
	}
	{
		grammar = {
		    "comment": "ECMA-262 5th Edition, 15.12.1 The JSON Grammar.",
		    "author": "Zach Carter",

		    "lex": {
			"macros": {
			    "digit": "[0-9]",
			    "esc": "\\\\",
			    "int": "-?(?:[0-9]|[1-9][0-9]+)",
			    "exp": "(?:[eE][-+]?[0-9]+)",
			    "frac": "(?:\\.[0-9]+)"
			},
			"rules": [
			    ["\\s+", "/* skip whitespace */"],
			    ["{int}{frac}?{exp}?\\b", "return 'NUMBER';"],
			    ["\"(?:{esc}[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\"", "yytext = yytext.substr(1,yyleng-2); return 'STRING';"],
			    ["\\{", "return '{'"],
			    ["\\}", "return '}'"],
			    ["\\[", "return '['"],
			    ["\\]", "return ']'"],
			    [",", "return ','"],
			    [":", "return ':'"],
			    ["true\\b", "return 'TRUE'"],
			    ["false\\b", "return 'FALSE'"],
			    ["null\\b", "return 'NULL'"]
			]
		    },

		    "tokens": "STRING NUMBER { } [ ] , : TRUE FALSE NULL",
		    "start": "JSONText",

		    "bnf": {
			"JSONString": [ "STRING" ],
			
			"JSONNullLiteral": [ "NULL" ],

			"JSONNumber": [ "NUMBER" ],

			"JSONBooleanLiteral": [ "TRUE", "FALSE" ],


			"JSONText": [ "JSONValue" ],

			"JSONValue": [ "JSONNullLiteral",
				       "JSONBooleanLiteral",
				       "JSONString",
				       "JSONNumber",
				       "JSONObject",
				       "JSONArray" ],

			"JSONObject": [ "{ }",
					"{ JSONMemberList }" ],

			"JSONMember": [ "JSONString : JSONValue" ],

			"JSONMemberList": [ "JSONMember",
					      "JSONMemberList , JSONMember" ],

			"JSONArray": [ "[ ]",
				       "[ JSONElementList ]" ],

			"JSONElementList": [ "JSONValue",
					     "JSONElementList , JSONValue" ]
		    }
		};
		var options = {type: "slr", moduleType: "commonjs", moduleName: "jsoncheck"};
		var code=Jison.Generator(grammar,options);
		console.log(cyclejs.decycle(code));
	}
	{
		// mygenerator.js
		var Parser = require("jison").Parser;

		var grammar = {
		    "lex": {
			"rules": [
			   ["\\s+", "/* skip whitespace */"],
			   ["[a-f0-9]+", "return 'HEX';"]
			]
		    },

		    "bnf": {
			"hex_strings" :[ "hex_strings HEX",
					 "HEX" ]
		    }
		};

		var parser = new Parser(grammar);

		// generate source, ready to be written to disk
		var parserSource = parser.generate();

		// you can also use the parser directly from memory
		try{
			parser.parse("adfe34bc e82a");
		// returns true
		}catch(e){
			console.error(e.toString());
		}

		try{
			parser.parse("adfe34bc zxg");
		// returns true
		}catch(e){
			console.error(e.toString());
		}

		// throws lexical error
	}
});
