require(['jquery'],function(jq){
	//run once!
	$=jq;
	$(document).ready(function(){
		$('head').append($("<link/>").attr("rel","stylesheet").attr("href","./lib/vendor/jspanel/jspanel.css"))
	});
});
