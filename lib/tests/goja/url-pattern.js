//easier than regex string matching patterns for urls and other strings.
//turn strings into data or data into strings.
//https://github.com/snd/url-pattern
define([
	"module",
	"console",
	"cyclejs",
	"url-pattern",
],function(
	module,
	console,
	cyclejs,
	UrlPattern
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(UrlPattern));
	{//basic usage
		var pattern = new UrlPattern('/api/users(/:id)');
		console.log(pattern.match('/api/users/10')); // {id: '10'}
		console.log(pattern.match('/api/users')); // {}
		console.log(pattern.match('/api/products/5')); // null
		console.log(pattern.stringify()); // '/api/users'
		console.log(pattern.stringify({id: 20})); // '/api/users/20'
	}
});
