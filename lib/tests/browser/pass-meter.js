define([
	"module",
	"pass-meter",
],function(
	module,
	passMeter
){
	console.log([module.id,'start'].join(':'));
	console.log(passMeter);
	{//basic usage
		console.log(passMeter("1234"));
	}
});
