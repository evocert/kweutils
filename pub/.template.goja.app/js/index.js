require(['/kweutils/lib/config.js'],function(config){
	require([
		window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'))+'/js/main.js'
	],function(){});
});
