//toastr is a Javascript library for non-blocking notifications. jQuery is required. The goal is to create a simple core library that can be customized and extended.
//https://github.com/CodeSeven/toastr
define([
	"module",
	"toastr",
	"css!vendor/toastr/2.1.4/toastr.min.css"
],function(
	module,
	toastr
){
	console.log([module.id,'start'].join(':'));
	console.log(toastr);
	{//basic usage
		toastr.info('Are you the 6 fingered man?')
	}
});
