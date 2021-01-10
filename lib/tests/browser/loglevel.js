//Minimal lightweight simple logging for JavaScript. loglevel replaces console.log() and friends with level-based logging and filtering, with none of console's downsides.
//This is a barebones reliable everyday logging library. It does not do fancy things, it does not let you reconfigure appenders or add complex log filtering rules or boil tea (more's the pity), but it does have the all core functionality that you actually use:
//https://github.com/pimterry/loglevel
//also has plugins like server send
define([
	"module",
	"loglevel",
],function(
	module,
	log
){
	console.log([module.id,'start'].join(':'));
	console.log(log);
	{//basic usage
		log.warn("unreasonably simple");
	}
	{
		var logging = log.noConflict();
	}
});
