define([
	"module",
	"console",
	"window",
	"document",
],function(
	module,
	console,
	_window,
	_document
){
	//bootstrap globals
	window=_window;
	document=_document;
	this.window=window;
	this.document=window;
	require(["console","jquery"],function(console,jq){
		var $=jq;
		$("head").append($("<meta/>").attr("charset","utf-8"));
		$("body").css({"background":"#222222"});
		$("body").css({"color":"#FFFFFF"});
		$("body").css({"font-family":"monospace"});
		$("body").append($("<h3/>").text(module.id));
		$("body").append($("<hr/>"));
		$("body").append($("<h4/>").text('Reponse:'));
		try{
			var t0=new Date();
			var response=JSON.parse(
				remoting.SendRespondString(
					"http://127.0.0.1:1031/kweutils/lib/init.goja.js?action=runtest&parameters=request",
					{},
					{},
					JSON.stringify(
						{
							"lorem":"ipsum"
						}//body???
					)
				)
			);
			var t1=new Date();
			$("body").append($("<pre/>").text(JSON.stringify(response,0,2)));
			$("body").append($("<p/>").text(["Duration:",(t1-t0),"ms"].join(" ")));
		}catch(e){
			$("body").append($("<div/>").text(e.toString()));
		}
		$("body").append($("<hr/>"));
		$("body").append($("<h4/>").text('Source:'));
		require([
			["text!","./",module.id,".js"].join("")],
			function(
				source
			){
			$("body").append(
				$("<pre/>").text(source)
			);
		});
		request.ResponseHeader().Set("Content-Type","text/html");
		print($(document).prop('outerHTML'));
	});
});
