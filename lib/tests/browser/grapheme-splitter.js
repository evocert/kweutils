//In JavaScript there is not always a one-to-one relationship between string characters and what a user would call a separate visual "letter". Some symbols are represented by several characters. This can cause issues when splitting strings and inadvertently cutting a multi-char letter in half, or when you need the actual number of letters in a string.
//https://github.com/orling/grapheme-splitter
define([
	"module",
	"grapheme-splitter"
],function(
	module,
	GraphemeSplitter
){
	console.log([module.id,'start'].join(':'));
	console.log(GraphemeSplitter);
	{//basic usage
		//todo
	}
});
