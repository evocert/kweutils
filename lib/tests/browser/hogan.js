//https://github.com/twitter/hogan.js
define([
	"module",
	"hoganjs",
],function(
	module,
	Hogan
){
	console.log([module.id,'start'].join(':'));
	console.log(Hogan);
	{
		var text = "my <%example%> template."
		console.log(Hogan.compile(text, {delimiters: '<% %>'}));
	}
	{
		var text = "my {{_foo}}example{{/foo}} template."
		console.log(Hogan.compile(text, { sectionTags: [{o: '_foo', c: 'foo'}]}));
	}
});