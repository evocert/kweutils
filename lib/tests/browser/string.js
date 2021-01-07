//string.js, or simply S is a lightweight (< 5 kb minified and gzipped) JavaScript library for the browser or for Node.js that provides extra String methods. Originally, it modified the String prototype. But I quickly learned that in JavaScript, this is considered poor practice.
//https://github.com/jprichardson/string.js
define([
	"module",
	"console",
	"cyclejs",
	"stringjs",
],function(
	module,
	console,
	cyclejs,
	S
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(S));
	console.log(S('my cool string').left(2).endsWith('y')); //true
});
