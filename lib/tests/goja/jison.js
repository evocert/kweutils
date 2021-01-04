//https://github.com/zaach/jison
//https://github.com/zaach/jison/tree/master/examples
//https://github.com/zaach/jison
//http://zaa.ch/jison/docs/
//https://nolanlawson.github.io/jison-debugger/
//https://www.andronio.me/2019/04/21/developing-a-custom-domain-specific-language-with-jison/
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
	{
		var grammar=
			"\/* lexical grammar *\/\r\n%lex\r\n\r\n%%\r\n\\s*\\@[^\\n\\r]*      \/* skip line comments *\/\r\n\\s+                \/* skip whitespace *\/\r\n\r\n[A-G](\\#|b)?[1-8]\\\/(128|64|32|16|8|4|2|1)(\\.{0,3})  return \'NOTE\';\r\nrest\\\/(128|64|32|16|8|4|2|1)(\\.{0,3})               return \'REST\';\r\n\r\n[0-9]+\\b           return \'NUMBER\';\r\n\\-{3,}             return \'BODY_SEPARATOR\';\r\n\\\"[^\"\\n]+\\\"        return \'STRING\'\r\n\r\n\"section\"          return \'SECTION\';\r\n\"song\"             return \'SONG\';\r\n\"end\"              return \'END\';\r\n\"tempo\"            return \'TEMPO\';\r\n\"time_signature\"   return \'TIME_SIGNATURE\';\r\n\"measure\"          return \'MEASURE\';\r\n\"import\"           return \'IMPORT\';\r\n\"from\"             return \'FROM\';\r\n\"to\"               return \'TO\';\r\n\"bpm\"              return \'BPM\';\r\n\":\"                return \':\';\r\n\"\/\"                return \'\/\';\r\n\r\n\/lex\r\n\r\n\/* operator associations and precedence *\/\r\n\r\n%left \':\'\r\n%left \'\/\'\r\n\r\n%start expressions\r\n\r\n%% \/* language grammar *\/\r\n\r\nexpressions\r\n    : song\r\n        { return { song: $1 }; }\r\n    ;\r\n\r\nsong\r\n    : SONG STRING END\r\n        { $$ = { name: $2 } }\r\n    ;\r\n"
		;
		var code=Jison.Generator(grammar)
		var Parser=require("jison").Parser;
		var parser=new Parser(grammar);
		// generate source, ready to be written to disk
		//Once you have generated the parser and saved it, you no longer need Jison or any other dependencies.
		var parserSource=parser.generate();
		console.log("parserSource:");
		console.log(parserSource);
		try{
			// you can also use the parser directly from memory
			var a=parser.parse('song "A good song" end');
			console.log("cyclejs.decycle(parser):");
			console.log(cyclejs.decycle(parser));
			console.log("done");
		}catch(e){
			console.error(e.toString());
		}
		try{
			// you can also use the parser directly from memory
			parser.parse("not valid");
		}catch(e){
			console.error(e.toString());
		}
		//console.log(cyclejs.decycle(parser));
		//Alternatively, if you want to use the Jison file format but not generate a static JavaScript file for it, you could use a snippet like this:
		//module.exports = parser;
	}
	{//calculator
		var grammar="\/* description: Parses end executes mathematical expressions. *\/\r\n\r\n\/* lexical grammar *\/\r\n%lex\r\n\r\n%%\r\n\\s+                   \/* skip whitespace *\/\r\n[0-9]+(\".\"[0-9]+)?\\b  return \'NUMBER\';\r\n\"*\"                   return \'*\';\r\n\"\/\"                   return \'\/\';\r\n\"-\"                   return \'-\';\r\n\"+\"                   return \'+\';\r\n\"^\"                   return \'^\';\r\n\"(\"                   return \'(\';\r\n\")\"                   return \')\';\r\n\"PI\"                  return \'PI\';\r\n\"E\"                   return \'E\';\r\n<<EOF>>               return \'EOF\';\r\n\r\n\/lex\r\n\r\n\/* operator associations and precedence *\/\r\n\r\n%left \'+\' \'-\'\r\n%left \'*\' \'\/\'\r\n%left \'^\'\r\n%left UMINUS\r\n\r\n%start expressions\r\n\r\n%% \/* language grammar *\/\r\n\r\nexpressions\r\n    : e EOF\r\n        {println($1); return $1;}\r\n    ;\r\n\r\ne\r\n    : e \'+\' e\r\n        {$$ = $1+$3;}\r\n    | e \'-\' e\r\n        {$$ = $1-$3;}\r\n    | e \'*\' e\r\n        {$$ = $1*$3;}\r\n    | e \'\/\' e\r\n        {$$ = $1\/$3;}\r\n    | e \'^\' e\r\n        {$$ = Math.pow($1, $3);}\r\n    | \'-\' e %prec UMINUS\r\n        {$$ = -$2;}\r\n    | \'(\' e \')\'\r\n        {$$ = $2;}\r\n    | NUMBER\r\n        {$$ = Number(yytext);}\r\n    | E\r\n        {$$ = Math.E;}\r\n    | PI\r\n        {$$ = Math.PI;}\r\n    ;";
		var code=Jison.Generator(grammar)
		var Parser=require("jison").Parser;
		var parser=new Parser(grammar);
		var codbuf=(function(){
			ret=[];
			var operators="+-*/^".split("");
			for(var i=0;i<4096;i++){
				var stmt=[];
				for(var j=0;j<50;j++){
					stmt.push(Math.floor(Math.random()*10))
					stmt.push(operators[Math.floor(Math.random()*operators.length)])
				}
				stmt.push(Math.floor(Math.random()*10));
				ret.push(stmt.join(""));
			}
			return ret;
		})();
		codbuf.forEach(function(cod){
			console.log([cod,":"].join(""));
			try{
				var result=parser.parse(cod);
				console.log(result);
			}catch(e){
				console.error(e.toString());
			}
		});
	}
});
