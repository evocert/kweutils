define([
	"module",
	"jquery",
	"tinydatepicker",
	"css!vendor/tiny-date-picker/3.2.8/tiny-date-picker.min.css"
],function(
	module,
	jq,
	TinyDatePicker
){
	console.log([module.id,'start'].join(':'));
	console.log(TinyDatePicker);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
		}
	`));
	{//basic usage
		var el=$("<input/>");
		$("body").append(el);
		TinyDatePicker(el[0],{});
	}
});
