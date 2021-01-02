//http://sylvester.jcoglan.com/
define([
	"module",
	"sylvester",
],function(
	module,
	sylvester
){
	console.log([module.id,'start'].join(':'));
	console.log(sylvester);
	{
		var V1 = sylvester.$V([3,4,5]);
		var V2 = sylvester.$V([9,-3,0]);

		var d = V1.dot(V2);
		// d is 15

		var c = V1.cross(V2);
		// c is the vector (15,45,-45)
		console.log(d);
		console.log(c);
	}
	{
		var M1 = sylvester.$M([
		  [1,7,3],
		  [9,4,0],
		  [2,7,1]
		]);

		var M2 = sylvester.$M([
		  [6,2,8],
		  [9,1,3],
		  [0,7,6]
		]);

		var M = M1.x(M2);

		// M is the matrix
		//   69 30 47
		//   90 22 84
		//   75 18 43
		console.log(M);
	}
});
