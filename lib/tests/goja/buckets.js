//Buckets is a complete, fully tested and documented data structure library written in pure JavaScript.
//https://github.com/mauriciosantos/Buckets-JS
//http://mauriciosantos.github.io/Buckets-JS/
define([
	"module",
	"console",
	"cyclejs",
	"buckets",
],function(
	module,
	console,
	cyclejs,
	buckets
){
	console.log([module.id,'start'].join(':'));
	console.log(buckets);
	{
		var hm = new buckets.Dictionary();
		console.log(cyclejs.decycle(hm));
	}
	{
		var a = new buckets.Set();
		var b = new buckets.Set();
		a.add(1);
		a.add(2);
		b.add(2);
		a.union(b); // {1,2}
		console.log(a.toArray());
		console.log(b.toArray());
	}
});
