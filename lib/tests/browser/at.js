//An autocompletion library to autocomplete mentions, smileys etc. just like on Github!
//note: depends on jquery and https://github.com/ichord/Caret.js
//note: not working properly
define([
	"module",
	"jquery",
	"atjs",
	"css!vendor/at/1.4.1/css/jquery.atwho.min.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log($().atwho);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
		}
		input{
			background:#444444;
			color:#888888;
			padding:4px;
			border:unset;
		}
		.atwho-view ul {
			border:unset;
			background:#555555;
		}
		.atwho-view .cur {
			border:unset;
			background:#666666;
		}
	`));
	{//basic usage
		var input=$("<input/>");
		$("body").append(input);
		input.atwho({
			    at: "@",
			    data:['Peter', 'Tom', 'Anne']
		})
	}
});
