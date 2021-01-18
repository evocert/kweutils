//Ultra lightweight javascript router for those that need the most basic simple javascript routing.
//https://github.com/garygreen/lightrouter
define([
	"module",
	"lightrouter",
],function(
	module,
	LightRouter
){
	console.log([module.id,'start'].join(':'));
	console.log(LightRouter);
	{//basic usage
		// Initialise the router
		var router = new LightRouter({
			type: 'path',			// Default routing type
			handler: handler,		// Handler for string-based route callbacks
			pathRoot: 'my-app/path',	// Base path for your app
			routes: {
				 '':'home',		// Base Url
				 'users':'userIndex',
				 'users/{id}':'userShow',
				 'users/(.*)':function(params) { /* User: params[0] */ },
				 'users/(?:create|{id}/edit)': function(params) { /* Create/Edit User: params.id */ }
			}
		});

		// Route callback handlers
		var handler = {
			home:				function() { },
			userIndex:	 function() { },
			userShow:		function(params) { /* Show user: params.id */ }
		};

		// Run the router
		router.run();

		//add routes
		router.add(/anywhere-in-url-match\/(\w+)/, function(params) { });
		router.add('articles/{id}', function(params) { console.log('loading article ' + params.id); });
		router.add('user/{userId}/show', function(params) { console.log('showing user', params.userId); });
	}
});
