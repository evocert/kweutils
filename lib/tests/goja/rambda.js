//Rambda is smaller and faster alternative to the popular functional programming library Ramda. - Documentation
//https://github.com/selfrefactor/rambda
define([
	"module",
	"console",
	"cyclejs",
	"rambda",
],function(
	module,
	console,
	cyclejs,
	R
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(R));
	{//basic usage
		console.log(R.add(2,3));//=>5
		compose=R.compose;
		map=R.map;
		filter=R.filter;
		console.log(compose(
			//map(x=>x*2),
			map(function(x){return x*2}),
			//filter(x=>x>2)
			filter(function(x){return x>2})
		)([1,2,3,4]));
		//=>[6,8]
	}
});
