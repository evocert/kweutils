//The tiny, fast, easy, yet powerful hash router in JavaScript.
//About 3K minified, 1.4K gzipped
//No performance drop as you add routes
//Order of route declaration doesn't matter: the most specific route wins
//Parses query strings (see note)
//TypeScript v3 definitions
//Zero dependencies
//https://github.com/aMarCruz/easyrouter
define([
	"module",
	"easyrouter",
],function(
	module,
	router
){
	console.log([module.id,'start'].join(':'));
	console.log(router);
	{//basic usage
		// Require the router if using brunch, browserify, webpack, etc.
		//const router = require('easyrouter')

		// handler for '#/login', defined by the `enter` method of the route.
		const login = () => {
			// Here you can, by example, show a popup or change all the content
			// of the page.
			console.log('Login')
		}

		// This function handles routes for two rules, one of them has a placeholder
		// ':id' whose value will be extracted from the hash that enters the route
		// and placed in the property 'id' of 'params'.
		// 'title' is a custom property of the route context defined by us.
		//
		// NOTE the use of the 'function' keyword, since we are accessing `this`,
		//			we should not use an arrow function here.
		//
		const resourceEditor = function (params) {
			$('#header').html(this.title)

			// IMPORTANT: Parameter values are of type 'string', always.
			if (params.id) {
				console.log(`Editing the resource ${params.id}`)
			} else {
				console.log(`Creating a new resource.`)
			}
		}

		// Data for the routes.
		// The 'path' property defines the rule and is the only required property.
		// 'title' is a custom property and will be part of the route context.
		// 'enter' methods here takes precedence over the callback passed to the
		// router `add` function.
		const data = [
			{
				path: '#/resources',
				title: 'Resources'
			}, {
				path: '#/resource/:id',
				title: 'Edit resource',
				enter: resourceEditor
			}, {
				path: '#/resource/new',
				title: 'New resource',
				enter: resourceEditor
			}, {
				path: '#/resource/ext/*',	// the '*' allows hashes that start with
				title: 'Other resource'		// '#/resources/ext', the complete hash can
			}, {					 // be obtained from the context.
				path: '#/login',
				enter: login
			}
		]

		// Configure and start the router.
		// This is a singleton that maintains its state between hash changes.
		// You can reset it completely with the `reset` method.
		router
			// The `add` method adds routes without eliminating the previous ones.
			// Its additional parameter is the default `enter` method for the routes
			// that are added.
			.add(data, function (params) {
				// The `enter` method is executed in the context of the current route
				// and receives a parameter with values in the current hash.
				console.log(this.hash, params)
			})
			.onExit((route) => {
				// global callback called on exit a previous route
				console.log(`Leaving ${route.hash}`)
			})
			.onEnter((route) => {
				// global callback called before run the current route
				console.log(`Entering ${route.hash}`)
			})
			.rescue((hash) => {
				// executed for non-existing routes or routes without `enter` method
				location.href = 'errors/404.html'
			})
			// starts the router using "#/login" for users that arrives to this
			// page without a hash.
			.listen('#login')
	}
});
