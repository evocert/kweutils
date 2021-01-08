//Cross domain local storage, with permissions.
//Enables multiple browser windows/tabs, across a variety of domains, to share a single localStorage.
//Features an API using ES6 promises.
//https://github.com/zendesk/cross-storage
define([
	"module",
	"cross-storage.client",
	"cross-storage.hub",
],function(
	module,
	CrossStorageClient,
	CrossStorageHub
){
	console.log([module.id,'start'].join(':'));
	console.log(CrossStorageClient);
	console.log(CrossStorageHub);
	{//configure
		CrossStorageHub.init([
		  {origin: /\.example.com$/,            allow: ['get']},
		  {origin: /:\/\/(www\.)?example.com$/, allow: ['get', 'set', 'del']}
		]);
	}
	{//client
		var storage = new CrossStorageClient('https://store.example.com/hub.html');

		storage.onConnect().then(function() {
		  return storage.set('newKey', 'foobar');
		}).then(function() {
		  return storage.get('existingKey', 'newKey');
		}).then(function(res) {
		  console.log(res.length); // 2
		}).catch(function(err) {
		  // Handle error
		});
	}
});
