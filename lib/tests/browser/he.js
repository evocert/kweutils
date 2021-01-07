//he (for "HTML entities") is a robust HTML entity encoder/decoder written in JavaScript. It supports all standardized named character references as per HTML, handles ambiguous ampersands and other edge cases just like a browser would, has an extensive test suite, and — contrary to many other JavaScript solutions — he handles astral Unicode symbols just fine. An online demo is available.
//https://github.com/mathiasbynens/he
define([
	"module",
	"console",
	"cyclejs",
	"he",
],function(
	module,
	console,
	cyclejs,
	he
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(he));
	{//basic usage
		console.log(he.encode('foo © bar ≠ baz 𝌆 qux'));
		console.log(he.encode('foo \0 bar'));
		console.log(he.escape('<img src=\'x\' onerror="prompt(1)">'));
	}
});
