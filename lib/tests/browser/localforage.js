define([
	"module",
	"localforage",
],function(
	module,
	localforage
){
	console.log([module.id,'start'].join(':'));
	console.log(localforage);
	{//basic usage - callback
		localforage.setItem('key', 'value', function (err) {
			console.log(err);
			// if err is non-null, we got an error
			localforage.getItem('key', function (err, value) {
				console.log(err);
				console.log(value);
				// if err is non-null, we got an error. otherwise, value is the value
			});
		});
	}
	{//promise
		localforage.setItem('key', 'value').then(function () {
			return localforage.getItem('key');
		}).then(function (value) {
			console.log(value);
			// we got our value
		}).catch(function (err) {
			console.error(err);
			// we got an error
		});
	}
	{//async/await
		/*
		try {
			const value = await localforage.getItem('somekey');
			// This code runs once the value has been loaded
			// from the offline store.
			console.log(value);
		} catch (err) {
			// This code runs if there were any errors.
			console.log(err);
		}
		*/
	}
	{//configuration
		/*
		localforage.config({
			driver	  : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
			name		: 'myApp',
			version	 : 1.0,
			size		: 4980736, // Size of database, in bytes. WebSQL-only for now.
			storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
			description : 'some description'
		});
		*/
	}
});
