//Countable is a JavaScript function to add live paragraph-, word- and character-counting to an HTML element. Countable is a zero-dependency library and comes in at 1KB when minified and gzipped.
//https://github.com/RadLikeWhoa/Countable
define([
	"module",
	"jquery",
	"countable"
],function(
	module,
	jq,
	Countable
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log(Countable);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		var textarea=$("<textarea/>");
		var output=$("<div/>");
		$("body").append(textarea);
		$("body").append(output);
		//Countable.count(textarea[0], counter => console.log(this, counter))
		Countable.on(textarea[0], function(counter){output.text(JSON.stringify(counter,0,2));});
	}
});
