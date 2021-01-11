//Elegant, responsive, flexible and lightweight notification plugin with no dependencies.
//https://github.com/marcelodolza/iziToast
//https://izitoast.marcelodolza.com/#Start
//http://izitoast.marcelodolza.com/
define([
	"module",
	"izitoast",
	"css!vendor/izitoast/1.4.0/iziToast.min.css"
],function(
	module,
	iziToast
){
	console.log([module.id,'start'].join(':'));
	console.log(iziToast);
	{//basic usage
		iziToast.show({
			    title: 'Hey',
			    message: 'What would you like to add?'
		});
	}
});
