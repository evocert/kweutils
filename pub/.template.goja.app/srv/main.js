define([
	"module",
	"./lib/a.js",
	"cyclejs",
	"console",
	"window",
	"document",
],function(
	module,
	liba,
	cyclejs,
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
		this.window=window;
		this.document=window;
		require(["console","jquery"],function(console,jq){
			var $=jq;
			$("body").append($("<h3/>").text(module.id));
			$("body").append($("<h3/>").text("RequireJS Configuration:"));
			$("body").append($("<div/>").text(JSON.stringify(cyclejs.decycle(require.s.contexts._.config))));
			$("body").append($("<h3/>").text("RequireJS Defined Modules:"));
			$("body").append($("<div/>").text(JSON.stringify(cyclejs.decycle(require.s.contexts._.defined))));
			$("body").append($("<h3/>").text("liba test:"));
			$("body").append($("<h3/>").text(liba()));
			$("body").append($("<h3/>").text("dom test:"));
			for(var i=0;i<8;i++){
				var div=$("<div/>")
					.attr('id','someid')
					.addClass(['foo','bar','baz'])
					.text('test_'+i)
				$("body").append(div);
			}
			//test events
			div.click(function(){
				console.log('clicked div');
			});
			div.click();
			console.log(div.prop('outerHTML'));
			console.log('done');
			request.ResponseHeader().Set("Content-Type","text/html");//request.ResponseHeader().Set("Content-Type","image/svg+xml");
			println($("body").prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
