//PathJS is a lightweight, client-side routing library that allows you to create "single page" applications using Hashbangs and/or HTML5 pushState.
//https://github.com/mtrpcic/pathjs
define([
	"module",
	"jquery",
	"pathjs",
],function(
	module,
	jq,
	Path
){
	console.log([module.id,'start'].join(':'));
	console.log(Path);
	$=jq;
	{//basic usage
		$("body").append($(`
			<div>
				<ul>
					<li><a href="#/users">users</a></li>
					<li><a href="#/comments">comments</a></li>
					<li><a href="#/posts">posts</a></li>
				</ul>
			</div>
		`));
		function clearPanel(){
			// You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
		}

		Path.map("#/users").to(function(){
			alert("Users!");
		});

		Path.map("#/comments").to(function(){
			alert("Comments!");
		}).enter(clearPanel);

		Path.map("#/posts").to(function(){
			alert("Posts!");
		}).enter(clearPanel);

		Path.root("#/posts");

		Path.listen();
	}
});
