//https://github.com/medialize/URI.js/
//not working correctly yet
//modifications made to vendor/URI/...
define([
	"module",
	"URI",
],function(
	module,
	URI
){
	console.log([module.id,'start'].join(':'));
	console.log(URI);
	window.URI=URI;
	{//basic usage
		console.log(
			// mutating URLs
			URI("http://example.org/foo.html?hello=world")
				.username("rodneyrehm")
					// -> http://rodneyrehm@example.org/foo.html?hello=world
				.username("")
					// -> http://example.org/foo.html?hello=world
				.directory("bar")
					// -> http://example.org/bar/foo.html?hello=world
				.suffix("xml")
					// -> http://example.org/bar/foo.xml?hello=world
				.query("")
					// -> http://example.org/bar/foo.xml
				.tld("com")
					// -> http://example.com/bar/foo.xml
				.query({ foo: "bar", hello: ["world", "mars"] })
					// -> http://example.com/bar/foo.xml?foo=bar&hello=world&hello=mars
		);
		console.log(
			// cleaning things up
			URI("?&foo=bar&&foo=bar&foo=baz&")
				.normalizeQuery()
					// -> ?foo=bar&foo=baz
		);
		console.log(
			// working with relative paths
			URI("/foo/bar/baz.html")
				.relativeTo("/foo/bar/world.html")
					// -> ./baz.html
		);
		console.log(
			URI("/foo/bar/baz.html")
				.relativeTo("/foo/bar/sub/world.html")
					// -> ../baz.html
				.absoluteTo("/foo/bar/sub/world.html")
					// -> /foo/bar/baz.html
		);
			/*
			// URI Templates
		console.log(//???
			URI.expand("/foo/{dir}/{file}", {
				dir: "bar",
				file: "world.html"
			})
			// -> /foo/bar/world.html
		);
			*/
	}
});
