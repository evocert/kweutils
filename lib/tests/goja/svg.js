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
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		//todo: try with https://github.com/svgdotjs/svgdom
		require(["jquery","svg"],function(jq,SVG){
			$=jq;
			var svgnod=$("<svg/>").attr("id","mysvg");
			$('body').append(svgnod);
			//var draw = SVG("#mysvg");//svgnod[0]);//.addTo('body').size(300, 300)
			var draw = SVG().addTo('body').size(300, 300)
			//var rect = draw.rect(100, 100).attr({ fill: '#f06' })
			println($("body").prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){
		console.error(e.toString());
		println(e.toString());
	}
});

