define(["module","jquery"],function(module,jq){
	$=jq;
	$(document).ready(function(){
		var cssbuf=[
			"dataTables.bootstrap.min.css",
			"jquery.dataTables.min.css",
			"responsive.bootstrap.min.css",
		];
		cssbuf.forEach(function(cssname){
			var cssurl=[module.uri.substring(0,module.uri.lastIndexOf('/')),cssname].join('/');
			var link=$("<link/>")
				.attr("rel","stylesheet")
				.attr("href",cssurl)
			;
			$("head").append(link);
		});
	});
});
