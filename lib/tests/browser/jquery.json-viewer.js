define([
	"module",
	"jquery",
	"jquery.json-viewer",
	"css!vendor/jqueryjsonviewer/1.4.0/jquery.json-viewer.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log($().jsonViewer);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		var div=$("<div/>");
		$("body").append(div);
		var data = require.s.contexts._.config;
		$(div).jsonViewer(data);
	}
});
