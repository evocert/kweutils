//A javascript slider selector that supports dates and touch devices
//https://github.com/ghusse/jQRangeSlider
//note: depends on jquery and jqueryui
define([
	"module",
	"jquery",
	"jqrangeslider",
	"css!vendor/jqrangeslider/5.7.2/css/classic-min.css",
	/*
	"css!vendor/jqrangeslider/5.7.2/css/classic.css",
	"css!vendor/jqrangeslider/5.7.2/css/icons-classic",
	"css!vendor/jqrangeslider/5.7.2/css/icons-classic/label.png",
	"css!vendor/jqrangeslider/5.7.2/css/icons-classic/resultset_next.png",
	"css!vendor/jqrangeslider/5.7.2/css/icons-classic/resultset_previous.png",
	"css!vendor/jqrangeslider/5.7.2/css/iThing-min.css",
	"css!vendor/jqrangeslider/5.7.2/css/iThing.css",
	*/
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().rangeSlider);
	var style=$("<style/>").text(`
		html,body{
			background:#222222;
			margin:24px;
		}
	`);
	$("body").append(style);
	{//basic usage
		var el=$("<div/>").css({"margin-bottom":"56px"});
		$("body").append(el);
		$(el).rangeSlider();
	}
	{//editable
		var el=$("<div/>").css({"margin-bottom":"56px"});
		$("body").append(el);
		$(el).editRangeSlider();
	}
	{//date slider
		var el=$("<div/>").css({"margin-bottom":"56px"});
		$("body").append(el);
		$(el).dateRangeSlider();
	}
});
