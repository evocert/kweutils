//Console.log with style
//https://github.com/adamschwartz/log
define([
	"module",
	"log",
],function(
	module,
	log
){
	console.log([module.id,'start'].join(':'));
	console.log(log);
	{//basic usage
		log('this is *italic*')
		log('this word _bold_')
		log('this word `code`')
	}
});
