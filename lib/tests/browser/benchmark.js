//A robust benchmarking library that supports high-resolution timers & returns statistically significant results. As seen on jsPerf.
//https://github.com/bestiejs/benchmark.js
//https://benchmarkjs.com/docs
//note: one time configuration
//require({
// 	'paths': {
// 		'benchmark': 'path/to/benchmark',
// 		'lodash': 'path/to/lodash',
// 		'platform': 'path/to/platform'
// 	}
// },
// ['benchmark'],
// function(Benchmark){
// 	/*…*/
// });
define([
	"module",
	"benchmarkjs",
],function(
	module,
	Benchmark
){
	console.log([module.id,'start'].join(':'));
	console.log(Benchmark);
	{//basic usage
		var suite = new Benchmark.Suite;

		// add tests
		suite.add('RegExp#test', function() {
		  /o/.test('Hello World!');
		})
		.add('String#indexOf', function() {
		  'Hello World!'.indexOf('o') > -1;
		})
		// add listeners
		.on('cycle', function(event) {
		  console.log(String(event.target));
		})
		.on('complete', function() {
		  console.log('Fastest is ' + this.filter('fastest').map('name'));
		})
		// run async
		.run({ 'async': true });

		// logs:
		// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
		// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
		// => Fastest is String#indexOf
	}
});
