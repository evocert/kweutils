//Math.js is an extensive math library for JavaScript and Node.js. It features a flexible expression parser with support for symbolic computation, comes with a large set of built-in functions and constants, and offers an integrated solution to work with different data types like numbers, big numbers, complex numbers, fractions, units, and matrices. Powerful and easy to use.
//https://github.com/josdejong/mathjs
//https://mathjs.org/docs/getting_started.html
//https://mathjs.org/examples/index.html
//https://mathjs.org/download.html#download
define([
	"module",
	"console",
	"cyclejs",
	"mathjs",
],function(
	module,
	console,
	cyclejs,
	math
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(math));
	{//basic usage
		//functions and constants
		console.log(math.round(math.e,3));//2.718
		console.log(math.atan2(3,-3)/math.pi);//0.75
		console.log(math.log(10000,10));//4
		console.log(math.sqrt(-4));//2i
		console.log(math.pow([[-1,2],[3,1]],2));//[[7,0],[0,7]]
		console.log(math.derivative('x^2+x','x'));//2*x+1
		//expressions
		console.log(math.evaluate('12 / (2.3 + 0.7)'));//4
		console.log(math.evaluate('12.7 cm to inch'));//5 inch
		console.log(math.evaluate('sin(45 deg) ^ 2'));//0.5
		console.log(math.evaluate('9 / 3 + 2i'));//3+2i
		console.log(math.evaluate('det([-1, 2; 3, 1])'));//-7
		//chaining
		console.log(math.chain(3)
		    .add(4)
		    .multiply(2)
		    .done());// 14
	}
});
