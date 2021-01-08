//db.js is a wrapper for IndexedDB to make it easier to work against, making it look more like a queryable API.
//https://github.com/aaronpowell/db.js/
define([
	"module",
	"dbjs",
],function(
	module,
	db
){
	console.log([module.id,'start'].join(':'));
	console.log(db);
	{//basic usage
		var server;
		db.open({
			server: 'my-app',
			version: 1,
			schema: {
			people: {
				key: {keyPath: 'id', autoIncrement: true},
				// Optionally add indexes
				indexes: {
				firstName: {},
				answer: {unique: true}
				}
			}
			}
		})
		.catch(function (err) {
			if (err.type === 'blocked') {
			oldConnection.close();
			return err.resume;
			}
			// Handle other errors here
			throw err;
		}).then(function (s) {
			server = s;
			// One can add a versionchange handler here to self-close
			//   the connection upon future upgrade attempts (likely to
			//   be one made in other tabs) and thereby
			//   avoid such attempts having to face blocking errors.
			server.people.add({
				firstName: 'Aaron',
				lastName: 'Powell',
				answer: 42
			}).then(function (item) {
				// item stored
				server.people.update({
					firstName: 'Aaron',
					lastName: 'Powell',
					answer: 24
				}).then(function (item) {
					// item added or updated
					server.people.remove(1).then(function (key) {
						// item removed
						server.people.clear()
							.then(function() {
								// all table data is gone.
						});
					});
				});
			});
		});
	}
});
