//https://github.com/alexei/sprintf.js/
//minor modifications for goja
define([
	"module",
	"console",
	"cyclejs",
	"sprintf",
],function(
	module,
	console,
	cyclejs,
	Sprintf
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Sprintf));
	sprintf=Sprintf.sprintf
	vsprintf=Sprintf.vsprintf
	{//basic usage
		console.log(sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants'));
		console.log(vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s', ['a', 'b', 'c', 'd']));
	}
	{
		var users = [
			    {name: 'Dolly'},
			    {name: 'Molly'},
			    {name: 'Polly'},
		]
		console.log(sprintf('Hello %(users[0].name)s, %(users[1].name)s and %(users[2].name)s', {users: users})); // Hello Dolly, Molly and Polly
	}
	{
		console.log(sprintf('Current date and time: %s', function() { return new Date().toString() }));
	}
});
