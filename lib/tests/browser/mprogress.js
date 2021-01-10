//Google Material Design Progress Linear bar
//https://github.com/lightningtgc/MProgress.js
//todo: fix up example
define([
	"module",
	"jquery",
	"mprogress",
	"css!vendor/mprogress/0.1.1/mprogress.min.css"
],function(
	module,
	jq,
	Mprogress
){
	console.log([module.id,'start'].join(':'));
	console.log(Mprogress);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	var id=0;
	{//basic usage
		var mprogress = new Mprogress();
		mprogress.start();
	}
	{//in element
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		$("body").append(div);
		var p=new Mprogress({
			  parent:["#",cssid].join("")
		});
		p.start();
	}
	{//end
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		div.text("Busy...");
		$("body").append(div);
		var p=new Mprogress({
			  parent:["#",cssid].join("")
		});
		p.start();
		window.setTimeout(function(){p.end();div.text("Done")},1000);
	}
	{//inc
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		div.text("Busy...");
		$("body").append(div);
		var p=new Mprogress({
			  parent:["#",cssid].join("")
		});
		window.setTimeout(function(){p.inc(0.25);},500);
		window.setTimeout(function(){p.inc(0.25);},1000);
		window.setTimeout(function(){p.inc(0.25);},1500);
		window.setTimeout(function(){p.end();div.text("Done")},2000);
	}
	{//set
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		div.text("Busy...");
		$("body").append(div);
		var p=new Mprogress({
			  parent:["#",cssid].join("")
		});
		window.setTimeout(function(){p.set(0.25);},500);
		window.setTimeout(function(){p.set(0.5);},1000);
		window.setTimeout(function(){p.set(0.75);},1500);
		window.setTimeout(function(){p.end();div.text("Done")},2000);
	}
	{//buffer
		var cssid=['progress_',id++].join("")
		var div=$("<div/>").attr({
			"id":cssid
		}).css({
			"padding":"8px",
			"margin":"8px",
			"background":"#444444",
			"font-family":"monospace",
			"color":"#888888"
		})
		div.text("Busy...");
		$("body").append(div);
		var p=new Mprogress({
			template:2,
			start:true,
			parent:["#",cssid].join("")
		});
		window.setTimeout(function(){p.end();div.text("Done")},2000);
	}

});
