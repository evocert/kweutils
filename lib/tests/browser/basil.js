//The missing Javascript smart persistence layer. Unified localstorage, cookie and session storage JavaScript API.
//Basil aims to ease the frontend storage management for developers. It strives to be bulletproof and handle disabled cookies, full localStorage and other unwanted native storage exceptions..
//When you try to store something, basil will automatically look through all the available storage mechanisms and find the best suited one to store your value. It also handles storage of complex javascript objects using json.
//https://github.com/Wisembly/basil.js
define([
	"module",
	"basil",
],function(
	module,
	Basil
){
	console.log([module.id,'start'].join(':'));
	console.log(Basil);
	{//basic usage
		var options=options = {
			  // Namespace. Namespace your Basil stored data
			  // default: 'b45i1'
			  namespace: 'foo',
			  // storages. Specify all Basil supported storages and priority order
			  // default: `['local', 'cookie', 'session', 'memory']`
			  storages: ['cookie', 'local'],
			  // expireDays. Default number of days before cookies expiration
			  // default: 365
			  expireDays: 31,
			  // keyDelimiter. The value used delimt the namespace from the key name
			  // default: '.'
			  keyDelimiter: '.'

			};
		basil = new Basil(options);

		// basic methods
		basil.set('foo', 'bar'); // store 'bar' value under 'foo' key
		basil.set('abc', 'xyz'); // store 'xyz' value under 'abc' key
		basil.get('foo'); // returns 'bar'
		basil.keys(); // returns ['abc', 'foo']
		basil.keysMap(); // returns { 'abc': ['local'], 'foo': ['local'] }
		basil.remove('foo'); // remove 'foo' value

		// advanced methods
		basil.check('local'); // boolean. Test if localStorage is available
		basil.reset(); // reset all stored values under namespace
	}
});
