//DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
//https://github.com/cure53/DOMPurify
define([
	"module",
	"jquery",
	"dompurify",
],function(
	module,
	jq,
	DOMPurify
){
	console.log([module.id,'start'].join(':'));
	console.log(DOMPurify);
	$=jq;
	{//basic usage

		console.log(dirty);
		console.log(clean);
		console.log(DOMPurify.sanitize('<img src=x onerror=alert(1)//>')); // becomes <img src="x">
		console.log(DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>')); // becomes <svg><g></g></svg>
		console.log(DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>')); // becomes <p>abc</p>
		console.log(DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">')); // becomes <math><mi></mi></math>
		console.log(DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>')); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
		console.log(DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>')); // becomes <ul><li><a href="//google.com">click</a></li></ul>
	}
	{//jquery nodes
		var dirty=$("<div/>")
			.append($("<script/>").text("alert('hi');"))
			.append($("<div/>").text("alert('hi');"))
			.append($("<a/>").attr({
				"href":"./",
				"onClick":"function(){alert('hi');}"
			}))
		;
		var clean=DOMPurify.sanitize(dirty[0]);
		console.log(dirty);
		console.log(clean);
	}
});
