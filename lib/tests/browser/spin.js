//An animated loading spinner
//  No images
//  No dependencies
//  Highly configurable
//  Resolution independent
//  Uses CSS keyframe animations
//  Works in all major browsers
//  Includes TypeScript definitions
//  Distributed as a native ES6 module
//  MIT License
//https://github.com/fgnass/spin.js
//https://spin.js.org/
define([
	"module",
	"jquery",
	"spinjs",
	"colorutils",
	"css!vendor/spinjs/4.1.0/spin.css"
],function(
	module,
	jq,
	Spinner,
	colorutils
){
	console.log([module.id,'start'].join(':'));
	console.log(Spinner);
	$=jq;
	Spinner=Spinner.Spinner;
	$("body").css({
		"background":"#222222"
	});
	{//basic usage
		var div=$("<div/>").attr({}).css({
			"background":"#444444",
			"padding":"8px",
			"margin":"8px",
		});
		$("body").append(div)
		new Spinner({color:'#fff', lines: 12}).spin(div[0]);
	}
	{//options
		var div=$("<div/>").attr({}).css({
			"background":"#444444",
			"padding":"8px",
			"margin":"8px",
		});
		$("body").append(div)
		new Spinner({
			lines: 13, // The number of lines to draw
			length: 38, // The length of each line
			width: 17, // The line thickness
			radius: 45, // The radius of the inner circle
			scale: 1, // Scales overall size of the spinner
			corners: 1, // Corner roundness (0..1)
			speed: 1, // Rounds per second
			rotate: 0, // The rotation offset
			animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#ffffff', // CSS color or array of colors
			fadeColor: 'transparent', // CSS color or array of colors
			top: '50%', // Top position relative to parent
			left: '50%', // Left position relative to parent
			shadow: '0 0 1px transparent', // Box-shadow for the lines
			zIndex: 2000000000, // The z-index (defaults to 2e9)
			className: 'spinner', // The CSS class to assign to the spinner
			position: 'absolute', // Element positioning
		}).spin(div[0]);
	}
	{//manual insertion
		var div=$("<div/>").attr({}).css({
			"background":"#444444",
			"padding":"8px",
			"margin":"8px",
		});
		$("body").append(div)
		var s=new Spinner({
			"className":"foo",
			"position":"unset",
			"color":'#ffffff',
		}).spin(div[0]);
		$(s.el).css({
			"height":"32px",
			"margin-top":"32px",
			"margin-left":"32px"
		});
		div.append(s);
	}
	{//colors
		var div=$("<div/>").attr({}).css({
			"background":"#444444",
			"padding":"8px",
			"margin":"8px",
		});
		$("body").append(div)
		nlines=12;
		length=30;
		colorbuf=[];
		for(var i=0;i<nlines;i++){
			colorbuf.push(colorutils.hslToHex(i/nlines*100,100,50))
		}
		console.log(colorbuf);
		var s=new Spinner({
			"className":"foo",
			"position":"unset",
			"color":colorbuf,
			"lines":nlines,
		}).spin(div[0]);
		$(s.el).css({
			"height":Math.floor(length)+"px",
			"margin-top":Math.floor(length)*2+"px",
			"margin-left":Math.floor(length)*2+"px"
		});
		div.append(s);
	}
});

