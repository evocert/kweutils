//Internationalisation with easy syntax for node.js and browser.
//https://github.com/nodeca/babelfish/
define([
	"module",
	"console",
	"cyclejs",
	"babelfish",
],function(
	module,
	console,
	cyclejs,
	BabelFish,
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(BabelFish));
	try{//basic usage
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
	}catch(e){console.error(e.toString());}
	console.log("DONE");
});
