define(["module","jquery"],function(module,jq){
	$=jq;
	$(document).ready(function(){
                var cssurl=[module.uri.substring(0,module.uri.lastIndexOf('/')),'jquery.dataTables.min.css'].join('/');
		var link=$("<link/>")
			.attr("rel","stylesheet")
			.attr("href",cssurl)
		;
		$("head").append(link);
	});
});
