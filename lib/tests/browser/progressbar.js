//Responsive and slick progress bars with animated SVG paths. Use built-in shapes or create your own paths. Customize the animations as you wish.
//https://github.com/kimmobrunfeldt/progressbar.js
//https://kimmobrunfeldt.github.io/progressbar.js/
//https://progressbarjs.readthedocs.io/en/latest/
define([
	"module",
	"jquery",
	"progressbarjs",
	"idutils",
	"css!vendor/progressjs/0.1.0/progressjs.min.css"
],function(
	module,
	jq,
	ProgressBar,
	idutils
){
	console.log([module.id,'start'].join(':'));
	console.log(ProgressBar);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	var acc=0;
	{//basic usage
		var id=["test",acc++].join("_");
		var div=$("<div/>")
			.attr({
				"id":id
			})
			.css({
				"height":"4px",
				"background":"#FFFFFF",
				"margin-bottom":"24px",
			})
		;
		$("body").append(div);
		// Assuming we have an empty <div id="container"></div> in
		// HTML
		var bar = new ProgressBar.Line(["#",id].join(""), {easing: 'easeInOut'});
		bar.animate(1);  // Value from 0.0 to 1.0
	}
	{//by element
		var div=$("<div/>")
			.attr({
			})
			.css({
				"height":"4px",
				"background":"#FFFFFF",
				"margin-bottom":"24px",
			})
		;
		$("body").append(div);
		var bar = new ProgressBar.Line(div[0], {easing: 'easeInOut'});
		bar.animate(2);  // Value from 0.0 to 1.0
	}
	{//text
		var div=$("<div/>")
			.attr({
			})
			.css({
				"height":"4px",
			})
		;
		$("body").append(div);
		var bar = new ProgressBar.Line(div[0], {
			strokeWidth: 4,
			easing: 'easeInOut',
			duration: 1400,
			color: '#FFEA82',
			trailColor: '#eee',
			trailWidth: 1,
			svgStyle: {width: '100%', height: '100%'},
			text: {
				style: {
					// Text color.
					// Default: same as stroke color (options.color)
					color: '#999',
					position: 'absolute',
					right: '0',
					top: '30px',
					padding: 0,
					margin: 0,
					transform: null
				},
				autoStyleContainer: false
			},
			from: {color: '#FFEA82'},
			to: {color: '#ED6A5A'},
			step: (state, bar) => {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		});

		bar.animate(1.0);	// Number from 0.0 to 1.0
	}

});
