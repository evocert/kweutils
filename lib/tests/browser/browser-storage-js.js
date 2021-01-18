//JavaScript Library for Cross Browser Persistence using WebStorage (LocalStorage, SessionStorage, WebSQL and IndexedDB) for all browsers.
//Basically it allows us to use any of the storage technologies in a standard way.
//https://github.com/lcavadas/browser-storage-js
define([
	"module",
	"browser-storage-js",
],function(
	module,
	storage
){
	console.log([module.id,'start'].join(':'));
	console.log(storage);
});
