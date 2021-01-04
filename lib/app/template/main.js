http://localhost:1030/kweutils/index.html?action=runapp&arguments={%22app%22:%22template%22,%22options%22:{%22id%22:%22foo%22,%22class%22:%22asdf%22,%22style%22:%22background:rgb(32,32,32);border:4px%20solid%20rgb(64,64,64);color:rgb(128,128,128);font-family:monospace;%22,%22node%22:%22body%22,%22width%22:600,%22height%22:400}}
define([
	"module",
	"idutils",
	"jquery",
	"css!./css/animate.min.css",
	"css!../../vendor/jspanel/jspanel.css"
],function(
	module,
	idutils,
	jq,
){
	$=jq;
	return function(options){
		options=typeof(options)!='object'?{}:options;
		options.id=typeof(options.id)!='string'?idutils.uuidv4():options.id;
		options.class=typeof(options.class)!='string'?module.id:options.class;
		options.width=typeof(options.width)!='number'?320:options.width;
		options.height=typeof(options.height)!='number'?240:options.height;
		options.style=typeof(options.style)!='string'?"":options.style;
		options.node=typeof(options.node)!='string'?"body":options.node;
		var container=$("<div/>")
			.attr("id",options.id)
			.addClass(options.class)
			.attr("style",options.style)
			.css({
				"width":options.width,
				"height":options.height
			});
		container.text(JSON.stringify(options));
		$($(options.node).length>0?options.node:"body").append(container);
	}
});

