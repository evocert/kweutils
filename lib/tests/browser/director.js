//Director is a router. Routing is the process of determining what code to run when a URL is requested.
//A routing library that works in both the browser and node.js environments with as few differences as possible. Simplifies the development of Single Page Apps and Node.js applications. Dependency free (doesn't require jQuery or Express, etc).
//
//note: supports client side routing, server side routing(node), and command line interface routing, e.g. myapp someroute
//
//https://github.com/flatiron/director
define([
	"module",
	"jquery",
	"director",
],function(
	module,
	jq,
	Router
){
	console.log([module.id,'start'].join(':'));
	console.log(Router);
	$=jq;
	{//basic usage
		$("body").append($("<h3/>").text("Console example"));
		$("body").append($(`
			<ul>
				<li><a href="#/author">#/author</a></li>
				<li><a href="#/books">#/books</a></li>
				<li><a href="#/books/view/1">#/books/view/1</a></li>
			</ul>
		`))
		var author = function () { console.log("author"); };
		var books = function () { console.log("books"); };
		var viewBook = function (bookId) {
			console.log("viewBook: bookId is populated: " + bookId);
		};
		var routes = {
			'/author': author,
			'/books': [books, function() {
				console.log("An inline route handler.");
			}],
			'/books/view/:bookId': viewBook
		};
		var router = Router(routes);
		router.init();
		$("body").append($("<hr/>"));
	}
	{//jquery example
		$("body").append($("<h3/>").text("JQuery example"));
		$("body").append($(`
			<section data-route="author">Author Name</section>
			<section data-route="books">Book1, Book2, Book3</section>
			<ul>
				<li><a href="#/author">#/author</a></li>
				<li><a href="#/books">#/books</a></li>
			</ul>
		`));
		//
		// create some functions to be executed when
		// the correct route is issued by the user.
		//
		var showAuthorInfo = function () { console.log("showAuthorInfo"); };
		var listBooks = function () { console.log("listBooks"); };

		var allroutes = function() {
			var route = window.location.hash.slice(2);
			var sections = $('section');
			var section;

			section = sections.filter('[data-route=' + route + ']');

			if (section.length) {
				sections.hide(250);
				section.show(250);
			}
		};

		//
		// define the routing table.
		//
		var routes = {
			'/author': showAuthorInfo,
			'/books': listBooks
		};

		//
		// instantiate the router.
		//
		var router = Router(routes);

		//
		// a global configuration setting.
		//
		router.configure({
			on: allroutes
		});

		router.init();
		$("body").append($("<hr/>"));
	}
});
