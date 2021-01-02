//http://jsfromhell.com/classes/bignumber
define([
	"module",
	"bignumber"
],function(
	module,
	BigNumber
){
	console.log([module.id,'start'].join(':'));
	console.log(BigNumber);

	var a = new BigNumber("123456789012345678901234567890123456789"),
	b = "999999999999999999999999999.9999999999999999999999",
	c = new BigNumber("10"),
	d = new BigNumber("-2"),
	PI = new BigNumber(355, 100, BigNumber.ROUND_HALF_UP).divide(113);


	console.log(c.pow(d));
	console.log(PI);
	console.log(a.multiply(b));
});
