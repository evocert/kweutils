//Inject and update dynamic CSS using simple js templating
//https://github.com/ezakto/CSSTemplate.js
define([
	"module",
	"jquery",
	"csstemplate",
],function(
	module,
	jq,
	CSSTemplate
){
	console.log([module.id,'start'].join(':'));
	console.log(CSSTemplate);
	{//basic usage
		$("body").append($("<style/>").attr({"id":"test0"}).text(`
			body{
				background:$background;
			}
		`));
		var tpl = new CSSTemplate('test0');
		tpl.set({
			background:"#222222"
		});
	}
});
