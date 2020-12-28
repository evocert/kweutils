define([
	"module",
	"console",
	"vendor/domino/index",
	"window",
	"document",
],function(
	module,
	console,
	domino,
	_window,
	_document,
){
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		//https://github.com/fgnass/domino
		/*
		console.log(typeof(window));
		console.log(typeof(document));
		console.log(typeof(document.document));
		console.log(Object.keys(window));
		console.log(Object.keys(document));
		console.log(Object.keys(document.document));
		//console.log('typeof(document.asdf)');
		//console.log(typeof(document.asdf));
		var h1 = document.querySelector('h1');
		console.log(h1.innerHTML);
		console.log(h1 instanceof Element);
		*/




		console.log(typeof(domino));
		console.log(Object.keys(domino));
		console.log(Object.keys(domino.impl));
		require(["console","jquery"],function(console,jq){
			var t0=null;
			var t0=null;
			t0=new Date();
			var $=jq;
			var div=$("<div/>")
			div
				.attr('id','someid')
				.addClass(['foo','bar','baz'])
				.text('sometext')
				.append((function(){
					var ret=[];
					for(var i=0;i<512;i++){
						var child=$("<div/>")
						.attr('id','someid')
						.addClass(['foo','bar','baz'])
						.text('0x00')
						ret.push(child)
					}
					return ret;
				})())
			;
			/*
			div.find('div').text('0x00')
			div.find('div').attr('id','someid')
			div.find('div').addClass('someclass')
			*/
			t1=new Date();
			console.log('generated:  '+(t1-t0));
			t0=new Date();
			//$('body').append(div);//slows down!
			println(div.prop('outerHTML'));
			t1=new Date();
			console.log('serialized: '+(t1-t0));
			//console.log('done');
			//println(document.documentElement.innerHTML);//div.prop('outerHTML'));
			//println($('body').prop('outerHTML'));
		});
var incrParser = domino.createIncrementalHTMLParser();
incrParser.write('<p>hello<');
incrParser.write('b>&am');
incrParser.process(pauseAfter(1/*ms*/)); // can interleave processing
incrParser.write('p;');
// ...etc...
incrParser.end(); // when done writing the document

while (incrParser.process(pauseAfter(10/*ms*/))) {
  // ...do other housekeeping...
}

console.log(incrParser.document().outerHTML);
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
