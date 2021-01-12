//Selectize is an extensible jQuery-based custom <select> UI control. It's useful for tagging, contact lists, country selectors, and so on. It clocks in at around ~7kb (gzipped). The goal is to provide a solid & usable experience with a clean and powerful API.
//https://github.com/selectize/selectize.js
//http://selectize.github.io/selectize.js/
define([
	"module",
	"jquery",
	"selectize",
	"css!vendor/selectize/0.12.4/css/selectize.css",
	"css!vendor/selectize/0.12.4/css/selectize.bootstrap3.css",
	/*
	"css!vendor/selectize/0.12.4/css/selectize.default.css",
	"css!vendor/selectize/0.12.4/css/selectize.bootstrap2.css",
	"css!vendor/selectize/0.12.4/css/selectize.legacy.css",
	*/
	"css!/kweutils/css/bootswatch/slate/bootstrap.min",
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	{//basic usage
		var el=$("<input/>");
		$("body").append(el);
		$(el).selectize({
			delimiter: ',',
			persist: false,
			create: function(input) {
				return {
					value: input,
					text: input
				}
			}
		});
	}
});
