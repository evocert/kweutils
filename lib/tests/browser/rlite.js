//Tiny, fast, light-weight JavaScript routing with zero dependencies.
//Order of route declaration doesn't matter: the most specific route wins
//Zero dependencies
//No performance drop as you add routes
//Less than 700 bytes minified and gzipped
//Parses query strings
//Wildcard support
//https://github.com/chrisdavies/rlite
define([
	"module",
	"rlite",
],function(
	module,
	rlite
){
	console.log([module.id,'start'].join(':'));
	console.log(rlite);
	{//basic usage
		const route = rlite(notFound, {
			// Default route
			'': function () {
				return 'Home';
			},

			// #inbox
			'inbox': function () {
				return 'Inbox';
			},

			// #sent?to=john -> r.params.to will equal 'john'
			'sent': function ({to}) {
				return 'Sent to ' + to;
			},

			// #users/chris -> r.params.name will equal 'chris'
			'users/:name': function ({name}) {
				return 'User ' + name;
			},

			// #users/foo/bar/baz -> r.params.path will equal 'foo/bar/baz'
			'users/*path': function ({path}) {
				return 'Path = ' + path;
			},

			// #logout
			'logout': function () {
				return 'Logout';
			}
		});

		function notFound() {
			return '<h1>404 Not found :/</h1>';
		}

		// Hash-based routing
		function processHash() {
			const hash = location.hash || '#';

			// Do something useful with the result of the route
			document.body.textContent = route(hash.slice(1));
		}

		window.addEventListener('hashchange', processHash);
		processHash();
	}
});
