define([
	"module",
	"console",
	"cyclejs",
	"quaternion",
],function(
	module,
	console,
	cyclejs,
	Quaternion
){
	console.log([module.id,'start'].join(':'));
	console.log(Quaternion);
	{//basic usage
		var q=new Quaternion("99.3+8i");
		console.log(cyclejs.decycle(q));
		console.log(cyclejs.decycle(q.mul(1,2,3,4).div([3,4,1]).sub(7,[1,2,3])));
	}
});
