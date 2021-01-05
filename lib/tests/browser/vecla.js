//https://github.com/francisrstokes/vec-la
//https://hackernoon.com/more-functional-refactoring-a-vector-library-4bf3d6b88612
define([
	"module",
	"vecla",
],function(
	module,
	vec
){
	console.log([module.id,'start'].join(':'));
	console.log(vec);
	{
		var mb = vec.matrixBuilder(); // Defaults to identity matrix
		var finalMatrix = mb
		  .rotate(Math.PI/6)
		  .scale(2, 3)
		  .shear(0.2, 0)
		  .translate(20, 40)
		  .get();
		console.log(finalMatrix);
		// [ 
		//  2.0320508075688775, -0.48038475772933664, 20,
		//  1.4999999999999998, 2.598076211353316, 40,
		//  0, 0, 1
		// ]
	}
});
