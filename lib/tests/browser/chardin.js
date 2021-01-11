//Chardin.js is a jQuery plugin that creates a simple overlay to display instructions on existent elements.
//It is inspired by the recent Gmail new composer tour
//https://github.com/heelhook/chardin.js
define([
	"module",
	"jquery",
	"chardin",
	"css!vendor/chardin/0.2.0/chardinjs.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().chardinJs)
	{//basic usage
		$("body").append($("<style/>").text(`
			body,html{
				background:#222222;
				font-family:monospace;
			}
			.chardinjs-tooltiptext{
				color:#888888!important;
			}
			.chardinjs-tooltip.chardinjs-right::before,
			.chardinjs-tooltip.chardinjs-left::after,
			.chardinjs-tooltip.chardinjs-bottom::before,
			.chardinjs-tooltip.chardinjs-top::after{
				background-color:#888888;
			}
			.chardinjs-helper-layer {
				color: #888888;
			}
			.container{
			}
			img{
				display: block;
				margin-left: auto;
				margin-right: auto;
				max-height: 300px;
				height: 0px;
			}
		`));
		var img=$("<img/>")
			.attr({
				"src":"lib/vendor/chardin/0.2.0/chardin.png",
				"data-intro":"An awesome 18th-century painter, who found beauty in everyday, common things.",
				"data-position":"right"
			})
			.css({
				"width":"200px",
				"height":"250px"
			})
			.addClass([
			])
		;
		var container=$("<div/>").addClass("container");
		container.append(img);
		$("body").append(container);
		var chardinOverlay=$("body").chardinJs("start");
	}
});
