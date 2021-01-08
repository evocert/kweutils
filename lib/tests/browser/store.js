//Store.js provides basic key/value storage functionality (get/set/remove/each) as well as a rich set of plug-in storages and extra functionality.
//https://github.com/marcuswestin/store.js
//note there are also plugins:
//
// all.js: All the plugins in one handy place.
// defaults.js: Declare default values. Example usage
// dump.js: Dump all stored values. Example usage
// events.js: Get notified when stored values change. Example usage
// expire.js: Expire stored values at a given time. Example usage
// observe.js: Observe stored values and their changes. Example usage
// operations.js: Useful operations like push, shift & assign. Example usage
// update.js: Update a stored object, or create it if null. Example usage
// v1-backcompat.js: Full backwards compatibility with store.js v1. Example usage
// use as:
//	// Example plugin usage:
//	var expirePlugin = require('store/plugins/expire')
//	store.addPlugin(expirePlugin)
// plugins written as follows:
/*
// Example plugin that stores a version history of every value
var versionHistoryPlugin = function() {
	var historyStore = this.namespace('history')
	return {
		set: function(super_fn, key, value) {
			var history = historyStore.get(key) || []
			history.push(value)
			historyStore.set(key, history)
			return super_fn()
		},
		getHistory: function(key) {
			return historyStore.get(key)
		}
	}
}
store.addPlugin(versionHistoryPlugin)
store.set('foo', 'bar 1')
store.set('foo', 'bar 2')
store.getHistory('foo') == ['bar 1', 'bar 2']
*/
//builds:
// store.everything.min.js: All the plugins, all the storages. Source
// store.legacy.min.js: Full support for all tested browsers. Add plugins separately. Source
// store.modern.min.js: Full support for all modern browsers. Add plugins separately. Source
// store.v1-backcompat.min.js: Full backwards compatibility with store.js v1. Source
//
//Chances are you won't ever need another storage. But if you do...
//See storages/ for examples. Two good examples are memoryStorage and localStorage.
//Basically, you just need an object that looks like this:
/*
// Example custom storage
var storage = {
	name: 'myStorage',
	read: function(key) { ... },
	write: function(key, value) { ... },
	each: function(fn) { ... },
	remove: function(key) { ... },
	clearAll: function() { ... }
}
var store = require('store').createStore(storage)
*/
define([
	"module",
	"storejs",
],function(
	module,
	store
){
	console.log([module.id,'start'].join(':'));
	console.log(store);
	{//basic usage
		//Storecurrentuser
		if(store.get('user')==null){
			console.log("storing user");
			store.set('user',{name:'Marcus'});
		}else{
			console.log("user alreay defined");
		}
		//Getcurrentuser
		console.log(store.get('user'));
		//Removecurrentuser
		//store.remove('user');
		//Clearallkeys
		//store.clearAll();
		//Loopoverallstoredvalues
		store.each(function(value,key){console.log(key,'==',value)})//note:compressed???
	}
});
