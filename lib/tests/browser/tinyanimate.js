//Animation micro library. Vanilla JavaScript, includes a global and UMD. Minified to only 3.8kb. Uses requestAnimationFrame() if available, falls back to setTimeout().
//https://github.com/branneman/TinyAnimate
define([
	"module",
	"jquery",
	"tinyanimate"
],function(
	module,
	jquery,
	TinyAnimate,
){
	console.log([module.id,'start'].join(':'));
	console.log(TinyAnimate);
	{//basic usage
		var el=$("<div/>").css({"background":"#888888","width":"128px","height":"128px"});
		$("body").append(el);
		TinyAnimate.animateCSS(el[0], 'marginLeft', 'px', 10, 70, 500, 'easeInOutQuart', function() {
			    console.log('done!!!111oneone');
		});
	}
});
