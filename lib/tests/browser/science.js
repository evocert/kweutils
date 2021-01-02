//https://github.com/jasondavies/science.js/
//science.stats, containing various implementations of statistical methods similar to those provided by R;
//science.lin, for linear algebra.
define([
	"module",
	"science"
],function(
	module,
	science
){
	console.log([module.id,'start'].join(':'));
	console.log(science);
	console.log(science.stats.mean([1,2,4,8]));
	console.log(science.stats.median([1,2,4,8]));
	console.log(science.lin.dot([1,2],[3,4]));
});
