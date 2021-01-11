//A platform detection library that works on nearly all JavaScript platforms.
//https://github.com/bestiejs/platform.js/
define([
	"module",
	"console",
	"cyclejs",
	"platform",
],function(
	module,
	console,
	cyclejs,
	platform
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(platform));
	{//basic usage
		console.log(platform.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7.2; en; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 11.52'));
	}
});
