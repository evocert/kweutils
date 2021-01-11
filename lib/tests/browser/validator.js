//A library of string validators and sanitizers.
//https://github.com/validatorjs/validator.js
define([
	"module",
	"validator",
],function(
	module,
	validator
){
	console.log([module.id,'start'].join(':'));
	console.log(validator);
	{//basic usage
		  console.log(validator.isEmail('foo@bar.com')); //=> true
	}
});
