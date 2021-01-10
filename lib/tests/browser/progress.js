//ProgressJs is a JavaScript and CSS3 library which helps developers create and manage progress bars for every object on the page.
//https://github.com/usablica/progress.js
//https://github.com/usablica/progress.js/wiki/API
//note: global or instance???
define([
	"module",
	"jquery",
	"progressjs",
	"css!vendor/progressjs/0.1.0/progressjs.min.css"
],function(
	module,
	jq,
	progressJs
){
	console.log([module.id,'start'].join(':'));
	console.log(progressJs);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	var id=0;
	{//whole page
		progressJs().setOption("theme", "black");
		var p=progressJs().start();
		window.setTimeout(function(){p.set(50);},500);
	}
	{//element
		var div=$("<div/>")
			.attr({
				"id":"test0"
			})
			.css({
				"padding":"8px",
				"margin":"8px",
				"background":"#888888",
			})
		;
		$("body").append(div);
		var p=progressJs("#test0").start();
		window.setTimeout(function(){p.set(50);},500);
		window.setTimeout(function(){p.end();},1000);
	}
		////or for specific element
		//progressJs("#targetElement").start();

});
