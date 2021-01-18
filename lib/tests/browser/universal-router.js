//A simple middleware-style router that can be used in both client-side and server-side applications.
//Features
//
// It has simple code with only single path-to-regexp dependency.
// It can be used with any JavaScript framework such as React, Vue, Hyperapp etc.
// It uses the same middleware approach used in Express and Koa, making it easy to learn.
// It supports both imperative and declarative routing style.
// Routes are plain JavaScript objects with which you can interact as you like.
//
//https://www.kriasoft.com/universal-router/
//https://github.com/kriasoft/universal-router
//https://github.com/kriasoft/universal-router/blob/master/docs/getting-started.md
//https://www.kriasoft.com/universal-router/getting-started
define([
	"module",
	"universal-router",
],function(
	module,
	UniversalRouter
){
	console.log([module.id,'start'].join(':'));
	console.log(UniversalRouter);
	{//basic usage
		const routes = [
			{
				path: '', // optional
				action: () => `<h1>Home</h1>`
			},
			{
				path: '/posts',
				action: () => console.log('checking child routes for /posts'),
				children: [
					{
						path: '', // optional, matches both "/posts" and "/posts/"
						action: () => `<h1>Posts</h1>`
					},
					{
						path: '/:id',
						action: (context) => `<h1>Post #${context.params.id}</h1>`
					}
				]
			}
		]

		const router = new UniversalRouter(routes)

		router.resolve('/posts').then(html => {
			document.body.innerHTML = html // renders: <h1>Posts</h1>
		})
	}
});
