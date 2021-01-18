//Include.js is a tiny (1,3ko minified and gziped) Javascript loader. It can load normal javascript files or css but is more efficient with web modules.
//When it's possible, it will use async loading to speed up you page and will ensure the good executions of your script. It support nested dependencies, a useful feature to create clean and flexible javascript application.
//https://github.com/CapMousse/include.js
//http://capmousse.github.io/include.js/
define([
	"module",
	"includejs",
],function(
	module,
	include
){
	console.log([module.id,'start'].join(':'));
	console.log(include);
	{//basic usage
		include([
		  'https://google-analytics.com/ga.js',
		  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js',
		  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/languages/javascript.min.js'
		], function () {
		  hljs.initHighlightingOnLoad();
		  
		  try {
		    var pageTracker = _gat._getTracker("UA-24455497-2");
		    pageTracker._trackPageview();
		  } catch(err) {}
		});
	}
});
