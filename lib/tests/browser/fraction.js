//Internally, numbers are represented as numerator / denominator, which adds just a little overhead.
//However, the library is written with performance in mind and outperforms any other implementation, as you can see here.
//This basic data-type makes it the perfect basis for Polynomial.js and Math.js.
//
//Fraction.js tries to circumvent floating point errors, by having an internal representation of numerator and denominator.
//As it relies on JavaScript, there is also a limit. The biggest number representable is |Number.MAX_SAFE_INTEGER / 1|
//and the smallest is |1 / Number.MAX_SAFE_INTEGER|, with Number.MAX_SAFE_INTEGER=9007199254740991.
//
//https://github.com/infusion/Fraction.js
define([
	"module",
	"console",
	"cyclejs",
	"fractionjs",
],function(
	module,
	console,
	cyclejs,
	Fraction
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Fraction));
	{//basic usage
		var f=new Fraction("9.4'31'");//9.4313131313131...
		f=f.mul([-4,3]).mod("4.'8'");//4.88888888888888...
		console.log(f.toFraction());//-4154/1485
		console.log(f.s*f.n/f.d);
		console.log((9.4313131*(-4/3))%4.888888);
	}
	{//Laplace Probability
		//P({3}):
		console.log(new Fraction([3].length, 6).toString()); // 0.1(6)
		//P({1, 4}):
		console.log(new Fraction([1, 4].length, 6).toString()); // 0.(3)
		//P({2, 4, 6}):
		console.log(new Fraction([2, 4, 6].length, 6).toString()); // 0.5
	}
	{//Convert degrees/minutes/seconds to precise rational representation:
		var deg = 57; // 57°
		var min = 45; // 45 Minutes
		var sec = 17; // 17 Seconds
		console.log(new Fraction(deg).add(min, 60).add(sec, 3600).toString()); // -> 57.7547(2)
	}
	{//Rational approximation of irrational numbers
		//To approximate a number like sqrt(5) - 2 with a numerator and denominator, you can reformat the equation as follows: pow(n / d + 2, 2) = 5.
		var x="/";
		var s="";
		var a=new Fraction(0);
		var b=new Fraction(1);
		for(var n=0;n<=10;n++){
			var c=new Fraction(a).add(b).div(2);
			console.log([n,a,b,c,x].join("\t"));
			if(c.add(2).pow(2)<5){
				a=c;
				x="1";
			}else{
				b=c;
				x="0";
			}
			s+=x;
		}
		console.log(s)
	}
	{//Get the exact fractional part of a number
		var f=new Fraction("-6.(3416)");
		console.log(""+f.mod(1).abs()); // Will print 0.(3416)
	}
	{//Mathematical correct modulo
		//The behaviour on negative congruences is different to most modulo implementations in computer science. Even the mod() function of Fraction.js behaves in the typical way. To solve the problem of having the mathematical correct modulo with Fraction.js you could come up with thi
		var a=-1;
		var b=10.99;
		console.log(new Fraction(a).mod(b)); // Not correct, usual Modulo
		console.log(new Fraction(a).mod(b).add(b).mod(b)); // Correct! Mathematical Modulo
	}
	{//Arrays / Objects
		var numerator=4;
		var denominator=4;
		new Fraction(numerator, denominator);
		new Fraction([numerator, denominator]);
		new Fraction({n: numerator, d: denominator});
	}
	{//Integers
		new Fraction(42);
	}
	{//Doubles
		//If you pass a double as it is, Fraction.js will perform a number analysis based on Farey Sequences. If you concern performance, cache Fraction.js objects and pass arrays/objects.
		new Fraction(4.2);
	}
	{//Strings
		new Fraction("123.45");
		new Fraction("123/45"); // A rational number represented as two decimals, separated by a slash
		new Fraction("123:45"); // A rational number represented as two decimals, separated by a colon
		new Fraction("4 123/45"); // A rational number represented as a whole number and a fraction
		new Fraction("123.'456'"); // Note the quotes, see below!
		new Fraction("123.(456)"); // Note the brackets, see below!
		new Fraction("123.45'6'"); // Note the quotes, see below!
		new Fraction("123.45(6)"); // Note the brackets, see below!
	}
	{//Two arguments
		new Fraction(3, 2); // 3/2 = 1.5
	}
	{//Repeating decimal places
		//Fraction.js can easily handle repeating decimal places.
		//For example 1/3 is 0.3333.... There is only one repeating digit.
		//As you can see in the examples above, you can pass a number like 1/3 as "0.'3'" or "0.(3)", which are synonym.
		//There are no tests to parse something like 0.166666666 to 1/6!
		//If you really want to handle this number, wrap around brackets on your own with the function below for example: 0.1(66666666)

		//Assume you want to divide 123.32 / 33.6(567). WolframAlpha states that you'll get a period of 1776 digits. Fraction.js comes to the same result. Give it a try:
		var f=new Fraction("123.32");
		console.log(["Bam",f.div("33.6(567)").toString()].join(":"));
	}
	{//Attributes
		var f=new Fraction('-1/2');
		console.log(f.n); // Numerator: 1
		console.log(f.d); // Denominator: 2
		console.log(f.s); // Sign: -1
	}
});
