//min.css is a tiny, ultrafast and efficient JavaScript library for minifying CSS files that really makes your website faster - Online service.
//https://github.com/w3core/min.css
define([
	"module",
	"mincss",
],function(
	module,
	mincss
){
	console.log([module.id,'start'].join(':'));
	console.log(mincss);
	{//basic usage
		console.log(mincss(`
			html,body{
				background:#222222;
				color:#888888;
			}
			.box{
				background:#444444;
				color:#cCCCCCC;
			}
		`));
	}
});
