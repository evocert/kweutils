define([
	"module",
	"console",
	"vendor/domino/index"
],function(
	module,
	console,
	domino
){
	console.log([module.id,'start'].join(':'));
	try{
		window = domino.createWindow('');
		document = window.document;
		//console.log(Object.keys(window));
		//console.log(Object.keys(document));
		var Element = domino.impl.Element; // etc
		var window = domino.createWindow('<h1>Hello world</h1>', 'http://example.com');
		var document = window.document;
		// alternatively: document = domino.createDocument(htmlString, true)
		var h1 = document.querySelector('h1');
		console.log(h1.innerHTML);
		console.log(h1 instanceof Element);
		require([
			"jquery"//vendor/jquery/jquery.3.5.1"
		],function(jq){
			console.log('here at least');
		});
		/*
		*/
	}catch(e){
		console.error(e.toString());
	}
});
