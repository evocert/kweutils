//Complex.js is a well tested JavaScript library to work with complex number arithmetic in JavaScript. It implements every elementary complex number manipulation function and the API is intentionally similar to Fraction.js. Furthermore, it's the basis of Polynomial.js and Math.js.
//https://github.com/infusion/Complex.js
define([
	"module",
	"console",
	"cyclejs",
	"complex",
],function(
	module,
	console,
	cyclejs,
	Complex
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Complex));
	try{//basic usage
		var c=new Complex("99.3+8i");
		console.log(c);
		console.log(c.mul({re:3,im:9}).div(4.9).sub(3,2));
	}catch(e){console.error(e.toString())};
	try{//A classical use case for complex numbers is solving quadratic equations ax² + bx + c = 0 for all a, b, c ∈ ℝ:
		function quadraticRoot(a,b,c){
			var sqrt=Complex(b*b-4*a*c).sqrt();
			var x1=Complex(-b).add(sqrt).div(2*a);
			var x2=Complex(-b).sub(sqrt).div(2*a);
			return [x1,x2]
		}
		console.log(quadraticRoot(1,4,5));// -> -2 +- i
	}catch(e){console.error(e.toString())};
	try{//Objects
		var real=4;
		var imaginary=2;
		var angle=4;
		var radius=2;
		new Complex({re:real,im:imaginary});
		new Complex({arg:angle,abs:radius});
		new Complex({phi:angle,r:radius});
		new Complex([real,imaginary]);//Vector/Arraysyntax
	}catch(e){console.error(e.toString())};
	try{//Doubles
		new Complex(4.2);
	}catch(e){console.error(e.toString())};
	try{//Strings
		new Complex("123.45");
		new Complex("15+3i");
		new Complex("i");
	}catch(e){console.error(e.toString())};
	try{//Two Arguments
		new Complex(4,2);
	}catch(e){console.error(e.toString())};
	try{//Attributes
		var c=new Complex(3,2);
		console.log("Real part:"+c.re);//3
		console.log("Imaginary part:"+c.im);//2
	}catch(e){console.error(e.toString())};
});
