//Perfect library for adding search, sort, filters and flexibility to tables, lists and various HTML elements. Built to be invisible and work on existing HTML. Really simple and easy to use!
//https://github.com/javve/list.js
//https://listjs.com/
define([
	"module",
	"jquery",
	"listjs"
],function(
	module,
	jq,
	List
){
	console.log([module.id,'start'].join(':'));
	console.log(List);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		$("body").append($(`
			<div id="users">
			<!-- class="search" automagically makes an input a search field. -->
				<input class="search" placeholder="Search" />
			<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
				<button class="sort" data-sort="name">
					Sort
				</button>
			<!-- Child elements of container with class="list" becomes list items -->
				<ul class="list">
					<li>
			<!-- The innerHTML of children with class="name" becomes this items "name" value -->
						<h3 class="name">Jonny Stromberg</h3>
						<p class="born">1986</p>
					</li>
					<li>
						<h3 class="name">Jonas Arnklint</h3>
						<p class="born">1985</p>
					</li>
					<li>
						<h3 class="name">Martina Elm</h3>
						<p class="born">1986</p>
					</li>
					<li>
						<h3 class="name">Gustaf Lindqvist</h3>
						<p class="born">1983</p>
					</li>
				</ul>

			</div>
		`));
		var options = {
		  valueNames: [ 'name', 'born' ]
		};
		var userList = new List('users', options);
	}
});
