//Ion.RangeSlider. Is an easy, flexible and responsive range slider with tons of options.
//http://ionden.com/a/plugins/ion.rangeSlider/skins.html
//https://github.com/IonDen/ion.rangeSlider
define([
	"module",
	"jquery",
	"ionrangeslider",
	"css!vendor/ion.rangeslider/2.3.1/ion.rangeSlider.min.css",
],function(
	module,
	jquery,
	ionrangeslider
){
	console.log([module.id,'start'].join(':'));
	console.log(ionrangeslider);
	$("body").css({
		"background":"#222222",
		"color":"#CCCCCC"
	});
	{//basic usage
		var input=$(`<input type="text" id="example_id" name="example_name" value="" />`);
		$("body").append(input);
		input.ionRangeSlider();
	}
});
