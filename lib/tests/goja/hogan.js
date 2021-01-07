//https://github.com/twitter/hogan.js
define([
	"module",
	"console",
	"cyclejs",
	"hoganjs",
],function(
	module,
	console,
	cyclejs,
	Hogan
){
	console.log([module.id,'start'].join(':'));
	console.log(Hogan);
	{
		var text = "my <%example%> template."
		console.log(cyclejs.decycle(Hogan.compile(text, {delimiters: '<% %>'})));
	}
	{
		var text = "my {{_foo}}example{{/foo}} template."
		console.log(cyclejs.decycle(Hogan.compile(text, { sectionTags: [{o: '_foo', c: 'foo'}]})));
	}
});
