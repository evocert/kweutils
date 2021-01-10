//A navigation aid (aka, router) for the browser in 865 bytes~!
//https://github.com/lukeed/navaid
//note: not gettings this working
define([
	"module",
	"jquery",
	"navaid",
],function(
	module,
	jq,
	Navaid
){
	console.log([module.id,'start'].join(':'));
	console.log(Navaid);
	$=jq;
	{//basic usage
		$("body").append($(`
			<div>
				<ul>
					<li><a href="#/books">books</a></li>
					<li><a href="#/books/lorem">books/lorem</a></li>
					<li><a href="#/users/john">users/john</a></li>
					<li><a href="#/users/mary">users/mary</a></li>
					<li><a href="#/users/lukeed">users/lukeed</a></li>
				</ul>
			</div>
		`));
		// Setup router
		let router =new Navaid();
		// or: new Navaid();

		// Attach routes
		router
			.on('/', () => {
				console.log('~> /');
			})
			.on('/users/:username', params => {
				console.log('~> /users/:username', params);
			})
			.on('/books/*', params => {
				console.log('~> /books/*', params);
			});

		// Run as single instance
		router.run('/');
		//=> "~> /"
		router.run('/users/lukeed');
		//=> "~> /users/:username { username: 'lukeed' }"
		router.run('/books/kids/narnia');
		//=> "~> /books/* { wild: 'kids/narnia' }"

		// Run as long-lived router w/ history & "<a>" bindings
		// Also immediately calls `run()` handler for current location
		router.listen();
	}
});
