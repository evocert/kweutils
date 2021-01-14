//Dynamics.js is a JavaScript library to create physics-based animations
//https://github.com/michaelvillar/dynamics.js
//http://dynamicsjs.com/
define([
	"module",
	"jquery",
	"dynamics",
],function(
	module,
	jq,
	dynamics
){
	console.log([module.id,'start'].join(':'));
	console.log(dynamics);
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
		$("body").append($("<br/>"));
		$("body").append($("<br/>"));
		$("body").append($("<br/>"));
		var el=$("<div/>").css({
			"background":"#888888",
			"width":"128px",
			"height":"128px",
		});
		$("body").append(el);
		dynamics.animate(el[0],{
			translateX: 350,
			scale: 2,
			opacity: 0.5
		}, {
			type: dynamics.spring,
			frequency: 200,
			friction: 200,
			duration: 1500
		})
	}
});
