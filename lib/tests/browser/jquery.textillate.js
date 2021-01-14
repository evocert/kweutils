//Textillate.js combines some awesome libraries to provide an easy-to-use plugin for applying CSS3 animations to any text.
//https://github.com/jschr/textillate
//note:demo not working:  Uncaught TypeError: base.$current.html(...).lettering is not a function
define([
	"module",
	"jquery",
	"jquery.textillate",
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().textillate);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		$("body").append($(`<h1 class="tlt">My Title</h1>`));
		$('.tlt').textillate();
	}
});
