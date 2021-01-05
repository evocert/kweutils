//http://victorjs.org/
define([
	"module",
	"victorjs",
],function(
	module,
	Victor
){
	console.log([module.id,'start'].join(':'));
	console.log(Victor);
	{
		var vec=new Victor(1,2)
			.add(
				new Victor(1,2)
			)
			.subtract(
				new Victor(1,2)
			)
			.multiply(
				new Victor(1,2)
			)
			.divide(
				new Victor(1,2)
			)
			.invert()
			.invert()
			.mix(
				new Victor(2,1)
			)
			.normalize()
			.add(
				new Victor(1,2)
			)
			.limit(
				2.5,0
			)
			.add(
				new Victor(1,2)
			)
			.unfloat()
			.rotate(
				Math.PI
			)
			.unfloat()
			.rotateDeg(
				90
			)
			.unfloat()
			.randomize(
				new Victor(10,10),
				new Victor(-10,-10)
			)
			.randomizeAny(
				new Victor(10,10),
				new Victor(-10,-10)
			)
		;
		console.log(vec);
	}
	{
		var vec1 = new Victor(100, 100);
		var vec2 = new Victor(200, 200);
		console.log(vec1.dot(vec2));
	}
	{
		var vec1 = new Victor(100, 100);
		var vec2 = new Victor(500, 200);
		console.log(vec1.cross(vec2));
	}
	{
		console.log(new Victor(100, 100).length());
	}
	{
		console.log(new Victor(100, 100).lengthSq());
	}
	{
		console.log(Victor(100, 0)
		  .horizontalAngle());
		// => 0 (radians)

		console.log(Victor(100, 100)
		  .angleDeg());
		// => 45 (degrees)

		var vec = new Victor(0, 100);
		console.log(vec.angle() === Math.PI / 2);
	}
	{
		console.log(Victor(100, 0)
		  .verticalAngle());
		// => 1.57079 (PI/2 radians)

		console.log(Victor(100, 0)
		  .verticalAngleDeg());
		// => 90 (degrees)
	}
});
