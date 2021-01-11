//Lightweight, user-friendly onboarding tour library
//https://github.com/usablica/intro.js
define([
	"module",
	"jquery",
	"introjs",
	"css!vendor/introjs/2.9.3/introjs.min.css"
],function(
	module,
	jq,
	introJs
){
	console.log([module.id,'start'].join(':'));
	console.log(introJs);
	{//basic usage
		$=jq;
		$("body").append($("<style/>").text(`
			html,body{
				background:#222222;
				font-family:monospace;
				color:#CCCCCC;
				padding:8px;
			}
			a{
				color:#CCCCCC;
			}
		`));
		$("body").append($("<a/>").attr({"data-intro":"test 0","href":"#"}).text("test 0"));
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"data-intro":"test 1","href":"#"}).text("test 1"))
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"data-intro":"test 2","href":"#"}).text("test 2"))
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"data-intro":"test 3","href":"#"}).text("test 3"))
		$("body").append($("<br/>"));
		introJs().start();
	}
});
