//Responsive web typography at its finest: font-size and line-height based on element width.
//https://github.com/simplefocus/FlowType.JS
//https://simplefocus.com/flowtype
define([
	"module",
	"jquery",
	"LoremIpsum",
	"flowtype"
],function(
	module,
	jq,
	LoremIpsum
){
	console.log([module.id,'start'].join(':'));
	console.log($().flowtype);
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
		var lorem=new LoremIpsum();
		window.lorem=lorem;
		for(var i=0;i<32;i++){
			var p=$("<p/>").text(lorem.paragraph(42))
			$("body").append(p);
		}
		$('body').flowtype({
			   minimum : 500,
			   maximum : 1200
		});
	}
});
