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
			"d3",
			//"vendor/d3/4.13.0/d3.v4.min"",
			//"vendor/d3/3.5.17/d3.v3.min",
			//"vendor/d3/4.13.0/d3",
			//"vendor/d3/6.3.1/d3.min",
			"colorutils",
			//"text!./data/sample/waveform/geiger.json"
		],function(
			jq,
			d3,
			colorutils,
			//data
		){
			$=jq;
			var data=(function(){
				var ret=[];
				for(var i=0;i<128;i++){
					ret.push(Math.floor(Math.random()*height));
				}
				return ret;
			})();
			console.log(data);
			//data=JSON.parse(data);
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
			svg.selectAll('line')
				.data(data)
			.enter().append('line')
				.attr('y1', function(d) { return d[0]; })
				.attr('y2', function(d) { return d[1]; })
				.attr('x1', function(d, i) { return i +0.5; })
				.attr('x2', function(d, i) { return i +0.5; })
				.attr("stroke-width", 1)
				.attr("stroke", "green");
			request.ResponseHeader().Set("Content-Type","image/svg+xml");
			println($('svg').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

