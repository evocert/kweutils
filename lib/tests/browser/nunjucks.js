define([
	"module",
	"nunjucks",
],function(
	module,
	nunjucks
){
	console.log([module.id,'start'].join(':'));
	console.log(nunjucks);
	nunjucks.configure({ autoescape: true });
	console.log(nunjucks.renderString('Hello {{ username }}', { username: 'James' }));

});
