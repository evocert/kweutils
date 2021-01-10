//A small, fast and rich-API browser/platform/engine detector for both browser and node.
//https://github.com/lancedikson/bowser
define([
	"module",
	"jquery",
	"bowser"
],function(
	module,
	jq,
	Bowser
){
	console.log([module.id,'start'].join(':'));
	console.log(Bowser);
	window.Bowser=Bowser;
	$=jq;
	$("body").css({
		"background":"#222222",
		"font-family":"monospace",
		"color":"#CCCCCC"
	});
	$("body").append($("<pre>").text(JSON.stringify(Bowser,0,2)));
	{//basic usage
		//const browser = Bowser.getParser(window.navigator.userAgent);
	}
});
