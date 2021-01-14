//A JavaScript library that lets you curve type on the web.
//https://github.com/peterhry/circletype
//https://circletype.labwire.ca/
//https://github.com/orling/grapheme-splitter/blob/master/index.js
define([
	"module",
	"jquery",
	"LoremIpsum",
	"circletype",
	"grapheme-splitter"
],function(
	module,
	jq,
	LoremIpsum,
	CircleType,
	GraphemeSplitter
){
	console.log([module.id,'start'].join(':'));
	console.log(CircleType);
	console.log(GraphemeSplitter);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.circle{
			font-weight:bold;
			font-size:32px;
		}
	`));
	{//basic usage
		var lorem=new LoremIpsum();

		for(var i=0;i<8;i++){
			var p=$("<p/>").addClass(["circle"]).text(lorem.paragraph(4))
			$("body").append(p);
			// Instantiate `CircleType` with an HTML element.
			var circleType = new CircleType(p[0]);

			// Set the text radius and direction. Note: setter methods are chainable.
			circleType.radius(200).dir(-1);

			// Provide your own splitter function to handle emojis
			// @see https://github.com/orling/grapheme-splitter
			var splitter = new GraphemeSplitter()
			new CircleType(
				p[0],
				splitter.splitGraphemes.bind(splitter)
			);

		}
	}
});
