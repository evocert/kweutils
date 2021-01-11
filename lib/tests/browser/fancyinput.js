define([
	"module",
	"jquery",
	"fancyinput",
	"css!vendor/fancyinput/1.2.0/fancyInput.css"
],function(
	module,
	jquery,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	{//basic usage
		$("body").append($("<style/>").text(`
			html,body{
				background:#222222;
			}
		`));
		var input=$("<input/>").attr({}).attr({});
		var textarea=$("<textarea/>").attr({}).attr({});
		$("body").append($("<div/>").append(input));
		$("body").append($("<div/>").append(textarea));
		input.fancyInput();
		textarea.fancyInput();
	}
});
