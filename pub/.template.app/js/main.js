require([
	'/kweutils/lib/config.js'
],function(config){
	require([
		'jquery',
		'css!'+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'))+'/css/style.css'],
	function(
		jq,
	){
		$=jq;
		$('body').append($('<div id="container">Template</div>'));
	});
});
