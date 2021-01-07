//A javascript library for formatting and manipulating numbers.
//https://github.com/adamwdraper/Numeral-js
//http://numeraljs.com/
define([
	"module",
	"console",
	"cyclejs",
	"numeraljs",
],function(
	module,
	console,
	cyclejs,
	numeral
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(numeral));
	{//basic usage
		var myNumeral = numeral(1000);
		console.log(myNumeral.value());
		// 1000
		var myNumeral2 = numeral('1,000');
		console.log(myNumeral2.value());
		// 1000
		console.log(numeral(1000).format('0,0'));
	}
});
