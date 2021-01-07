//https://mozilla.github.io/nunjucks/getting-started.html
define([
	"module",
	"console",
	"nunjucks",
],function(
	module,
	console,
	nunjucks
){
	console.log([module.id,'start'].join(':'));
	console.log(nunjucks);
	nunjucks.configure({ autoescape: true });
	console.log(nunjucks.renderString('Hello {{ username }}', { username: 'James' }));
	//issue: TypeError: Cannot read property 'nunjucksPrecompiled' of undefined

});
