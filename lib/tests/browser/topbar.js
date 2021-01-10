//Site-wide progress indicator that is:
// Tiny (1KB minified and gzipped), no dependency
// Perfect for single-page applications
// Responsive
//https://github.com/buunguyen/topbar
//http://buunguyen.github.io/topbar/
define([
	"module",
	"jquery",
	"topbar",
	"q",
],function(
	module,
	jq,
	topbar,
	Q
){
	console.log([module.id,'start'].join(':'));
	console.log(topbar);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	Q.fcall
		(function(){
			return new Promise(function(resolve,reject){
				topbar.show();
				window.setTimeout(function(){topbar.hide();resolve()},1000);
			});
		})
		.then(function(){
			return new Promise(function(resolve,reject){
				topbar.config({
					autoRun		: false, 
					barThickness:5,
					barColors: {
						'0': 'rgba(26,	188, 156, .7)',
						'.3': 'rgba(41,	128, 185, .7)',
						'1.0': 'rgba(231, 76,	60,	.7)'
					},
					shadowBlur: 5,
					shadowColor:'rgba(0, 0, 0, .5)',
					className:'topbar',
				})
				topbar.show();
				(function step() {
					setTimeout(function() {	
						if (topbar.progress('+.01') < 1) step(); else resolve();
					}, 16)
				})()
			})
		})
		.then(function(){
			console.log('done');
		})
});
