define([
	"module",
	"console",
	//"window",
	//"document",
],function(
	module,
	console,
	//_window,
	//_document
){
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		//window=_window;
		//document=_document;
		require(["jquery","d3","colorutils"],function(jq,d3,colorutils){
			$=jq;
			var width=800;
			var height=600;
			var svgattr={
				'id':"dataviz_area",
				'viewbox':"0 0 100% 100%",
				'width':width,
				'height':height
			};
			var svg=d3.select("body")
				.append("svg")
				.attr("width",svgattr.width)
				.attr("height",svgattr.height)
				.attr("viewbox",svgattr.viewbox)
				.attr("id",svgattr.id)
			;
			for(var i=0;i<512;i++){
				svg.append("circle")
					.attr("cx", Math.random()*width)
					.attr("cy", Math.random()*height)
					.attr("r", Math.random()*width/80)
					.style("fill",(colorutils.hslToRgb(Math.random(),1,0.5)))//Math.random()*255)))
				;
			}
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
