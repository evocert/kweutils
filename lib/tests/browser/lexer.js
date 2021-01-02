//https://github.com/aaditmshah/lexer
//https://dzone.com/articles/parsing-in-javascript-tools-and-libraries-part-2
//also look at an antlr version for javascript
define([
	"module",
	"lexer",
],function(
	module,
	Lexer
){
	console.log([module.id,'start'].join(':'));
	console.log(Lexer);
	var lexer = new Lexer;
	 
	var chars = lines = 0;
	 
	lexer.addRule(/\n/, function () {
	    lines++;
	    chars++;
	});
	    
	lexer.addRule(/./, function () {
	    chars++;
	});
	    
	lexer.setInput("Hello World!\n Hello Stars!\n!")
	    
	lexer.lex();
	console.log(chars);
	console.log(lines);
});
