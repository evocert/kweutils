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
		this.window=window;
		this.document=window;
		require(["console","jquery"],function(console,jq){
			var $=jq;
			var div=$("<div/>")
				.attr('id','someid')
				.addClass(['foo','bar','baz'])
				.text('sometext')
				.append(
					$("<div/>")
					.attr('id','someid')
					.addClass(['foo','bar','baz'])
					.text('sometext')
				);
			//test events
			div.click(function(){
				console.log('clicked div');
			});
			div.click();
			console.log(div.prop('outerHTML'));
			console.log('done');
			println(div.prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
