//Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist.
//https://github.com/leizongmin/js-xss
define([
	"module",
	"js-xss",
],function(
	module,
	filterXSS
){
	console.log([module.id,'start'].join(':'));
	console.log(filterXSS);
	{//basic usage
		var dirty='<script>alert("xss");</scr' + 'ipt>';
		var clean=filterXSS(dirty);
		console.log(dirty);
		console.log(clean);
	}
	{//configuration
		/* ???
		var options = {
			whiteList: {
				a: ["href", "title", "target"]
			}
		};
		var myxss = new xss.FilterXSS(options);
		// then apply myxss.process()
		var html = myxss.process('<script>alert("xss");</script>');
		console.log(html);
		*/
	}
});
