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
		require(["jquery","d3","colorutils"],function(jq,d3,colorutils){
			$=jq;
			//--------------------------------------------------------------------------------
			function test0(){
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
				request.ResponseHeader().Set("Content-Type","image/svg");
				println($('body').prop('outerHTML'));
			};
			//--------------------------------------------------------------------------------
			function test1(){
				//setup style
				$('body').append($('<style/>').text("\n\
					svg{\n\
						background: #002200;\n\
						fill: #008800;\n\
					}\n\
					.bar{\n\
						fill: #008800;\n\
					}\n\
					\n\
					.bar:hover{\n\
						fill: #00FF00;\n\
					}\n\
					\n\
					.axis {\n\
						font: 10px sans-serif;\n\
					}\n\
					\n\
					.axis path,\n\
					.axis line {\n\
					fill: none;\n\
						stroke: #008800;\n\
						shape-rendering: crispEdges;\n\
					}\n\
				"
				));
				//setup data
				var data=[
					{
						"Letter": "A",
						"Freq": 20	
					},
					{
						"Letter" : "B",
						"Freq": 12
					},
					{
						"Letter" : "C",
						"Freq": 47
					},
					{
						"Letter" : "D",
						"Freq": 34
					},
					{
						"Letter" : "E",
						"Freq" : 54
					},
					{
						"Letter" : "F",
						"Freq" : 21
					},
					{
						"Letter" : "G",
						"Freq" : 57
					},
					{
						"Letter" : "H",
						"Freq" : 31
					},
					{
						"Letter" : "I",
						"Freq" : 17
					},
					{
						"Letter" : "J",
						"Freq" : 5
					},
					{
						"Letter" : "K",
						"Freq" : 23
					},
					{
						"Letter" : "L",
						"Freq" : 39
					},
					{
						"Letter" : "M",
						"Freq" : 29
					},
					{
						"Letter" : "N",
						"Freq" : 33
					},
					{
						"Letter" : "O",
						"Freq" : 18
					},
					{
						"Letter" : "P",
						"Freq" : 35
					},
					{
						"Letter" : "Q",
						"Freq" : 11
					},
					{
						"Letter" : "R",
						"Freq" : 45
					},
					{
						"Letter" : "S",
						"Freq" : 43
					},
					{
						"Letter" : "T",
						"Freq" : 28
					},
					{
						"Letter" : "U",
						"Freq" : 26
					},
					{
						"Letter" : "V",
						"Freq" : 30
					},
					{
						"Letter" : "X",
						"Freq" : 5
					},
					{
						"Letter" : "Y",
						"Freq" : 4
					},
					{
						"Letter" : "Z",
						"Freq" : 2
					}
					];

				// set the dimensions of the canvas
				var margin = {top: 20, right: 20, bottom: 70, left: 40},
				    width = 600 - margin.left - margin.right,
				    height = 300 - margin.top - margin.bottom;


				// set the ranges
				var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

				var y = d3.scale.linear().range([height, 0]);

				// define the axis
				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom")


				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .ticks(10);


				// add the SVG element
				var svg = d3.select("body").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", 
					  "translate(" + margin.left + "," + margin.top + ")");
				// load the data

				    data.forEach(function(d) {
					d.Letter = d.Letter;
					d.Freq = +d.Freq;
				    });
					
				  // scale the range of the data
				  x.domain(data.map(function(d) { return d.Letter; }));
				  y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

				  // add axis
				  svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis)
				    .selectAll("text")
				      .style("text-anchor", "end")
				      .attr("dx", "-.8em")
				      .attr("dy", "-.55em")
				      .attr("transform", "rotate(-90)" );

				  svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis)
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 5)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text("Frequency");


				  // Add bar chart
				  svg.selectAll("bar")
				      .data(data)
				    .enter().append("rect")
				      .attr("class", "bar")
				      .attr("x", function(d) { return x(d.Letter); })
				      .attr("width", x.rangeBand())
				      .attr("y", function(d) { return y(d.Freq); })
				      .attr("height", function(d) { return height - y(d.Freq); });

				println($('body').prop('outerHTML'));
			};
			//--------------------------------------------------------------------------------
			test1();

		
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

