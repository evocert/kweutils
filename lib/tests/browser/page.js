//Tiny Express-inspired client-side router.
//https://github.com/visionmedia/page.js
//note: not working so well
define([
	"module",
	"jquery",
	"pagejs",
],function(
	module,
	jq,
	page
){
	console.log([module.id,'start'].join(':'));
	console.log(page);
	$=jq;
	$("body").append($(`
		<div>
			<ul>
				<li><a href="#/test0">test0</a></li>
				<li><a href="#/test1">test1</a></li>
			</ul>
		</div>
	`));
	{//basic usage
		page("/test0",function(){
			console.log('test0');
		});
		page("/test1",function(){
			console.log('test');
		});
	}
	{//navigate
		  //page('/test0');//???
	}
});
