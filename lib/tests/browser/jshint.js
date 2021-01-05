//https://github.com/jshint/jshint/issues/2840
define([
	"module",
	"jquery",
	"jshint",
],function(
	module,
	jq,
	JSHINT
){
	console.log([module.id,'start'].join(':'));
	console.log(JSHINT);
	$=jq;
	var textarea=$("<textarea/>").attr({"lines":42,}).css({"background":"#004400","border":"0px","width":"100%","color":"#00FF00"});
	var feedback=$("<div/>").css({"padding":"8px","background":"#004400","border":"0px","width":"100%","color":"#00FF00"});
	$("body").append(textarea);
	$("body").append(feedback);
	textarea.keyup(function (e){
		console.log($(this).val());
		var source = $(this).val().split("\n")
		var options = {
			  undef: true
		};
		var predef = {
			  foo: false
		};
		JSHINT(source, options, predef);
		feedback.text(JSON.stringify(JSHINT.data()));
	});
});
