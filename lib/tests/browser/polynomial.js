//Polynomials are defined as the sum of variables with increasing integer power and their coefficients in a certain field
//https://github.com/infusion/Polynomial.js
//modifications made to ./lib/vendor/polynomialjs/1.4.5/polynomial.js for amd loader to loaded complex,fraction,etc
define([
	"module",
	"console",
	"cyclejs",
	//autoloaded:
	//"complexjs",	// Needed for field/ring Q	|__How to register with polynomialjs???
	//"fractionjs",	// Needed for field C 		|
	"polynomial"
],function(
	module,
	console,
	cyclejs,
	//autoloaded:
	//Complex,
	//Fraction,
	Polynomial
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Polynomial));
	try{//basic usage
		var p=new Polynomial("3x^2").add("-x^2");//2x^2
	}catch(e){console.error(e.toString())};
	try{//adding two polynomials
		var p=new Polynomial("3x^2").add("-x^2");//2x^2
	}catch(e){console.error(e.toString())};
	try{//second derivative polynomial
		var p = new Polynomial("5+3x^3+6x^5").derive(2); // 120x^3+18x
	}catch(e){console.error(e.toString())};
	try{//Objects
		new Polynomial({'3': 4, '5': '9'}); // 9x^5+4x^3
		new Polynomial([1,2,3]); //3x^2+2x+1
	}catch(e){console.error(e.toString())};
	try{//Integers
		new Polynomial(42);//42x^0
	}catch(e){console.error(e.toString())};
	try{//Doubles
		new Polynomial(4.2);//4.2x^0
	}catch(e){console.error(e.toString())};
	try{//Strings
		new Polynomial("98x^2+4+23x^4");
	}catch(e){console.error(e.toString())};
	try{//The string parser passes every coefficient directly to the field parser, which allows to pass complex and rational coefficients as well:
		// Example with complex numbers
		Polynomial.setField("C");
		new Polynomial("98x^2+i+23ix^4");

		// Example with rational numbers
		Polynomial.setField("Q");
		new Polynomial("5/3x^3+4/3x");
	}catch(e){console.error(e.toString())};
	try{//Fields
		//Polynomial.js is held general in order to operate on various fields.
		//Fraction.js and Complex.js build the perfect base to extend polynomials to rational and complex numbers.
		//	Q: Rational numbers supported by Fraction.js
		//	C: Complex numbers supported by Complex.js
		//	H: Quaternions supported by Quaternion.js
		//	Zp: Field of integers mod p, with p prime
		//	R: Field of real numbers
		Polynomial.setField("Q");
		Polynomial("3/2x^2-4x").mod("5x"); // 0

		Polynomial.setField("Z11");
		Polynomial("3x^2+x+7").gcd("3x^2+x+7"); // x^2+4x+6

		Polynomial.setField("Z7");
		Polynomial("9x^2+4").pow(3); // x^6+6x^4+5x^2+1

		Polynomial.setField("R");
		Polynomial("3x^3-1").mul(4); // 12x^3-4

		// Derivative of polynomial
		Polynomial.setField("Q");
		Polynomial("5+3x^3+6x^5").derive(); // 30x^4+9x^2

		// Integrated polynomial
		Polynomial.setField("Q");
		Polynomial("3x^2").integrate(); // x^3
	}catch(e){console.error(e.toString())};
	console.log("----------------------------------------");
	console.log("done");
	console.log("----------------------------------------");
});
