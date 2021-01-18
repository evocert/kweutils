//Tiny JavaScript implementation of context-free languages parser - Earley parser
//https://github.com/lagodiuk/earley-parser-js
define([
	"module",
	"earley-parser-js",
],function(
	module,
	tinynlp
){
	console.log([module.id,'start'].join(':'));
	console.log(tinynlp);
	{//basic usage
		// Define grammar
		var grammar = new tinynlp.Grammar([
		     // Define grammar production rules
		     'R -> S',
		     'S -> S add_sub M | M | num',
		     'M -> M mul_div T | T | num',
		     'T -> num',
		     
		     // Define terminal symbols
		     'num -> 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0',
		     'add_sub -> + | -',
		     'mul_div -> * | /'
		]);

		// You have to tokenize input by yourself!
		// Creating array of tokens
		var tokens = '2 + 3 * 4'.split(' ');

		// Parsing
		var rootRule = 'R';
		var chart = tinynlp.parse(tokens, grammar, rootRule);

		// Get array with all parsed trees
		// In case of ambiguous grammar - there might be more than 1 parsing tree
		var trees =  chart.getFinishedRoot(rootRule).traverse();

		// Iterate over all parsed trees and display them on HTML page
		for (var i in trees) {
		     console.log(JSON.stringify(trees[i]))
		}
	}
	{//Customizing logic of tokens classification into terminal symbols
		var grammar = new tinynlp.Grammar([
		    'R -> S',
		    'S -> S add_sub M | M | num',
		    'M -> M mul_div T | T | num',
		    'T -> num',
		]); 

		// Define function, which will classify tokens into terminal types
		grammar.terminalSymbols = function( token ) { 
		    // Actually, this method might be customized 
		    // to use some more sophisticated classification mechanisms
		    
		    if( '+' === token || '-' === token ) return ['add_sub'];
		    if( '*' === token || '/' === token ) return ['mul_div'];
		    if( token.match(/^\d+$/) ) return ['num'];
		    // It is also possible that classifier returns 
		    // more than one terminal symbol, e.g.: ['term1', 'term2']
		    
		    // Otherwise:
		    throw new Error("Can't recognize token: " + token);
		}   

		// You have to tokenize input by yourself!
		// Creating array of tokens
		var tokens = '2 + 3 * 4'.split(' ');

		// Parsing
		var rootRule = 'R';
		var chart = tinynlp.parse(tokens, grammar, rootRule);

		// Get array with all parsed trees
		// In case of ambiguous grammar - there might be more than 1 parsing tree
		var trees =  chart.getFinishedRoot(rootRule).traverse();

		// Iterate over all parsed trees and display them on HTML page
		for (var i in trees) {
		     console.log(JSON.stringify(trees[i]))
		}
	}
});
