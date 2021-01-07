//This is designed to be a mathematically correct random number generator library for JavaScript.
//Inspiration was primarily taken from C++11's <random>.
define([
	"module",
	"console",
	"randomjs",
],function(
	module,
	console,
	random
){
	console.log([module.id,'start'].join(':'));
	console.log(random);
	{
		var/*const*/ seed=new Date().getTime();
		var/*const*/ mt=random.MersenneTwister19937.seedWithArray(seed);
		for(var i=0;i<4096;i++){
			console.log(mt.next());
		}
		//useTwisterALot(mt); // you'll have to implement this yourself
		var/*const*/ clone=random.MersenneTwister19937.seedWithArray(seed).discard(
			mt.getUseCount()
		);
		// at this point, `mt` and `clone` will produce equivalent values
		console.log("----------------------------------------");
	}
	{
		// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
		var/*const*/ engine=random.MersenneTwister19937.autoSeed();
		// create a distribution that will consistently produce integers within inclusive range [0, 99].
		var/*const*/ distribution=random.integer(0,99);
		// generate a number that is guaranteed to be within [0, 99] without any particular bias.
		function generateNaturalLessThan100() {
			return distribution(engine);
		}
		for(var i=0;i<4096;i++){
			console.log(generateNaturalLessThan100());
		}
		console.log("----------------------------------------");
	}
});
