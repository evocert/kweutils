//The FieldVal-JS library allows you to easily validate data and provide readable and structured error reports.
//https://github.com/FieldVal/fieldval-js
//http://www.fieldval.com/docs/fieldval/Browser%20Usage
//note: for server and browser
define([
	"module",
	"fieldval",
],function(
	module,
	FieldVal
){
	console.log([module.id,'start'].join(':'));
	console.log(FieldVal);
	{//basic usage
		var validator=new FieldVal({
			"my_key":37
		});
		var my_key=validator.get("my_key",BasicVal.integer(true),BasicVal.minimum(40));
		console.log(validator.end());
	}
});
