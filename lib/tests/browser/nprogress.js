//Slim progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium.
//https://github.com/rstacruz/nprogress
//note: concurrent usage or singleton ???
define([
	"module",
	"jquery",
	"nprogress",
	"css!vendor/nprogress/0.2.0/nprogress.css"
],function(
	module,
	jq,
	NProgress
){
	console.log([module.id,'start'].join(':'));
	console.log(NProgress);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	var id=0;
	function test0(){//basic usage
		var cssid=['progress_',id++].join("")
		var n=NProgress.start();
		window.setTimeout(function(){n.done();n.remove()},2000);
	}
	function test1(){//in element / configure
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"position":"relative",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		$("body").append(div);
		NProgress.configure({parent:["#",cssid].join("")})
		var n=NProgress.start();
		window.setTimeout(function(){n.done();n.remove()},2000);
	}
	function test2(){//in element / configure
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"position":"relative",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		$("body").append(div);
		NProgress.configure({parent:["#",cssid].join("")})
		var n=NProgress.start();
		window.setTimeout(function(){n.done();n.remove()},2000);
	}
	function test3(){//in element / configure
		NProgress.configure({
			minimum: 0.08,
			easing: 'linear',
			positionUsing: '',
			speed: 200,
			trickle: true,
			trickleSpeed: 200,
			showSpinner: true,
			barSelector: '[role="bar"]',
			spinnerSelector: '[role="spinner"]',
			template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div><span style="color:#FFFFFF">custom template</span></div>'
		})
		var n=NProgress.start();
		window.setTimeout(function(){n.done();n.remove()},2000);
	}
	test3();



});
