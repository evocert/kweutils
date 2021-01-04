define([
	"module",
	"console",
	"window",
	"document",
],function(
	module,
	console,
	_window,
	_document
){
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		require([
			"jquery",
			//"d3",
                        "vendor/d3/4.13.0/d3.v4.min",
                        //"vendor/d3/3.5.17/d3.v3.min",
                        //"vendor/d3/4.13.0/d3",
                        //"vendor/d3/6.3.1/d3.min",
			"colorutils"
		],function(jq,d3,colorutils){
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
			svg.append("rect")
				.attr("width","100%")
				.attr("height","100%")
				.attr("fill","#210044");
			// create data
			//var data = [{x: 0, y: 20}, {x: 150, y: 150}, {x: 300, y: 100}, {x: 450, y: 20}, {x: 600, y: 130}]
			var data = (function(){
				var ret=[];
				var nitr=128;
				for(var i=0;i<nitr;i++){
					x=i/nitr*svgattr.width;
					y=Math.random()*svgattr.height;
					ret.push({
						x:x,
						y:y,
					});
				}
				return ret;
			})();
			console.log(data);

			// create svg element:
			//var svg = d3.select("#area").append("svg").attr("width", 800).attr("height", 200)

			// prepare a helper function
			var curveFunc = d3.area()
			  .x(function(d) { return d.x })      // Position of both line breaks on the X axis
			  .y1(function(d) { return d.y })     // Y position of top line breaks
			  .y0(svgattr.height)                            // Y position of bottom line breaks (200 = bottom of svg area)

			// Add the path using this helper function
			svg.append('path')
			  .attr('d', curveFunc(data))
			  .attr('stroke', '#432266')
			  .attr('fill', '#321155');

			request.ResponseHeader().Set("Content-Type","image/svg+xml");
			println($('body').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

