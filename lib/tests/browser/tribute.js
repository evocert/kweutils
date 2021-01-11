//A cross-browser @mention engine written in ES6, no dependencies. Tested in Firefox, Chrome, iOS Safari, Safari, IE 9+, Edge 12+, Android 4+, and Windows Phone.
//https://github.com/zurb/tribute
define([
	"module",
	"jquery",
	"tribute",
	"css!vendor/tribute/5.1.3/tribute.css"
],function(
	module,
	jq,
	Tribute
){
	console.log([module.id,'start'].join(':'));
	console.log(Tribute);
	$=jq;
	$("body").append($(`
		<style>
			html,body{
				background:#222222;
				color:#888888;
				font-family:monospace;
			}
			.tribute-container {
			}
			.tribute-container ul {
				margin: 0;
				margin-top: 0px;
				margin-top: 2px;
				padding: 0;
				list-style: none;
				background: #333333;
			}
			.tribute-container li.highlight {
				background: #444444;
			}
			.tribute-container li {
				padding: 5px 5px;
				cursor: pointer;
			}
		</style>
	`));
	{//basic usage
		$("body").append($(`
			<div id="caaanDo">I'm Mr. Meeseeks, look at me!</div>

			<div class="mentionable">Some text here.</div>
			<div class="mentionable">Some more text over here.</div>
		`));
		var tribute = new Tribute({
			values: [
				{ key: "Phil Heartman", value: "pheartman" },
				{ key: "Gordon Ramsey", value: "gramsey" }
			]
		});
		tribute.attach(document.getElementById("caaanDo"));
		// also works with NodeList
		tribute.attach(document.querySelectorAll(".mentionable"));
	}
});
