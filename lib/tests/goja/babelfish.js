//Internationalisation with easy syntax for node.js and browser.
//https://github.com/nodeca/babelfish/
define([
	"module",
	"console",
	"cyclejs",
	"babelfish",
	"window",
	"document",
],function(
	module,
	console,
	cyclejs,
	BabelFish,
	_window,
	_document
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(BabelFish));
	//bootstrap globals
	window=_window;
	document=_document;
	this.window=window;
	this.document=window;
	require(["console","jquery"],function(console,jq){
		var $=jq;
		console.log=function(val){$("body").append($("<div/>").css({"background":"#111111","border":"1px solid #555555","padding":"4px","margin":"4px","color":"#888888"}).text(val));};
		console.error=function(val){$("body").append($("<div/>").css({"background":"#881100","border":"1px solid #AA1100","padding":"4px","margin":"4px","color":"#CC8844"}).text(val));};
		console.info=function(val){$("body").append($("<div/>").css({"background":"#001188","border":"1px solid #0011AA","padding":"4px","margin":"4px","color":"#4488CC"}).text(val));};
		console.danger=function(val){$("body").append($("<div/>").css({"background":"#881100","border":"1px solid #AA1100","padding":"4px","margin":"4px","color":"#CC8844"}).text(val));};
		$("head").append($("<meta/>").attr("charset","utf-8"));
		$("body").css({"background":"#222222"});
		$("body").css({"color":"#FFFFFF"});
		$("body").css({"font-family":"monospace"});
		$("body").append($("<h3/>").text(module.id));
		$("body").append($("<hr/>"));
		try{//basic usage
			var t0=new Date();
			var i18n = new BabelFish('en-GB');

			// Fill in some phrases
			i18n.addPhrase('en-GB', 'demo.hello',         'Hello, #{user.name}.');
			i18n.addPhrase('en-GB', 'demo.conv.wazup',    'Whats up?');
			i18n.addPhrase('en-GB', 'demo.conv.alright',  'Alright, man!');
			i18n.addPhrase('en-GB', 'demo.coerce',        'Total: #{count}.');

			i18n.addPhrase('ru-RU', 'demo.hello',         'Привет, #{user.name}.');
			i18n.addPhrase('ru-RU', 'demo.conv.wazup',    'Как дела?');

			i18n.addPhrase('uk-UA', 'demo.hello',         'Здоровенькі були, #{user.name}.');


			// Set locale fallback to use the most appropriate translation when possible
			i18n.setFallback('uk-UA', 'ru-RU');


			// Translate
			var params = {user: {name: 'ixti'}};

			console.log(i18n.t('ru-RU', 'demo.hello', params));  // -> 'Привет, ixti.'
			console.log(i18n.t('ru-RU', 'demo.conv.wazup'));     // -> 'Как дела?'
			console.log(i18n.t('ru-RU', 'demo.conv.alright'));   // -> 'Alright, man!'

			console.log(i18n.t('uk-UA', 'demo.hello', params));  // -> 'Здоровенькі були, ixti.'
			console.log(i18n.t('uk-UA', 'demo.conv.wazup'));     // -> 'Как дела?'
			console.log(i18n.t('uk-UA', 'demo.conv.alright'));   // -> 'Alright, man!'

			// When params is number or strings, it will be coerced to
			// `{ count: XXX, value: XXX }` - use any of those in phrase.
			console.log(i18n.t('en-GB', 'demo.coerce', 5));      // -> 'Total: 5.'


			// You may wish to "dump" translations to load in browser later
			// Dump will include all fallback translations and fallback rules
			var locale_dump = i18n.stringify('ru-RU');

			var i18n_new = require('babelfish')('en-GB'); // init without `new` also works
			i18n_new.load(locale_dump);


			// Use objects instead of strings (object/array/number/boolean) - can be
			// useful to prepare bulk data for external libraries.
			// Note, only JSON-supported types are ok (no date & regex)
			i18n.addPhrase('en-GB', 'demo.boolean',  true);
			i18n.addPhrase('en-GB', 'demo.number',   123);
			i18n.addPhrase('en-GB', 'demo.array',    [1, 2, 3]);
			// fourth param required for hashes (objects) to disable flattening,
			// other types are autodetected
			i18n.addPhrase('en-GB', 'demo.array',    { foo:1, bar:"2" }, false);
			var t1=new Date();
			console.info(["Duration:",t1-t0,"ms"].join(" "));
		}catch(e){console.error(e.toString());}

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
	console.log("DONE");
});
