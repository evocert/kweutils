//A library of string validators and sanitizers.
//https://github.com/validatorjs/validator.js
define([
	"module",
	"console",
	"cyclejs",
	"validator",
],function(
	module,
	console,
	cyclejs,
	validator
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(validator));
	{//basic usage
		  console.log(validator.isEmail('foo@bar.com')); //=> true
	}
});
