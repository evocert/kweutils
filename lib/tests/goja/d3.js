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
		require(["jquery","d3"],function(jq,d3){
			$=jq;
			console.log(typeof(d3));
			console.log(typeof($));
			console.log(Object.keys(d3));
			console.log(typeof(d3.version));
			console.log(d3.version);
			var svgnode=$('<svg id="dataviz_area" height=200 width=450></svg>')
			$('body').append(svgnode);
			var svg = d3.select("#dataviz_area")
			svg.append("circle").attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");
			svg.append("circle").attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
			svg.append("circle").attr("cx", 300).attr("cy", 100).attr("r", 40).style("fill", "green");
			for(var i=0;i<32;i++){
				svg.append("circle").attr("cx", Math.random()*300).attr("cy", Math.random()*100).attr("r", Math.random()*40).style("fill", "green");
			}
			console.log($('body').prop('outerHTML'));
			println($('body').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
