//A isomorphic, bullet-proof, ninja-ready route parsing, matching, and reversing library for Javascript in Node and the browser.
//https://github.com/rcs/route-parser
//modified lib/vendor/route-praser/0.0.5 for amd
define([
	"module",
	"route-parser",
],function(
	module,
	Route
){
	console.log([module.id,'start'].join(':'));
	console.log(Route);
	var route = new Route('/my/fancy/route/page/:page');
	console.log(route);
	console.log(route.match('/my/fancy/route/page/7')); // { page: 7 }
	console.log(route.reverse({page: 3})); // -> '/my/fancy/route/page/3'
});
