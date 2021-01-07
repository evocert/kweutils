//Voca is a JavaScript library for manipulating strings. https://vocajs.com
//The Voca library offers helpful functions to make string manipulations comfortable: change case, trim, pad, slugify, latinise, sprintf'y, truncate, escape and much more. The modular design allows to load the entire library, or individual functions to minimize the application builds. The library is fully tested, well documented and long-term supported.a
//features:
//Provides the complete set of functions to manipulate, chop, format, escape and query strings
//Includes detailed, easy to read and searchable documentation
//Supports a wide range of environments: Node.js 0.10+, Chrome, Firefox, Safari 7+, Edge 13+, IE 9+
//100% code coverage
//No dependencies
//https://github.com/panzerdp/voca
//https://vocajs.com/
define([
	"module",
	"console",
	"cyclejs",
	"voca",
],function(
	module,
	console,
	cyclejs,
	v
){
	console.log([module.id,'start'].join(':'));
	console.log(v);
	{//basic usage
		console.log(v.camelCase('bird flight'));              // => 'birdFlight'
		console.log(v.sprintf('%s costs $%.2f', 'Tea', 1.5)); // => 'Tea costs $1.50'
		console.log(v.slugify('What a wonderful world'));     // => 'what-a-wonderful-world'
	}
	{//chaining
		console.log(
			v('Back to School')
			 .lowerCase()
			 .words()
			// => ['back', 'to', 'school']
		);

		console.log(
			v(" Back to School ")
			 .trim()
			 .truncate(7)
			 .value()
			// => 'Back...'
		);
	}
	{//thru
		console.log(
			v
			 .chain('sun is shining')
			 .words()
			 .thru(function(words) {
			   return words[0];
			 })
			 .value()
			// => 'sun'
		);
	}
});
