define([
	"module",
	"console",
	"window",
	"document",
],function(
	module,
	console,
	_window,
	_document,
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
                        "vendor/d3/4.13.0/d3.v4",
                        //"vendor/d3/4.13.0/d3.v4.min",
                        //"vendor/d3/3.5.17/d3.v3.min",
                        //"vendor/d3/4.13.0/d3",
                        //"vendor/d3/6.3.1/d3.min",
			"colorutils",
			"text!data/csv/3_TwoNumOrdered_comma.csv"
		],function(jq,d3,colorutils,csv){
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
			/*
			svg.append("rect")
				.attr("width","100%")
				.attr("height","100%")
				.attr("fill","#210044");
			*/


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
var dataset=d3.csvParse(csv);
data=[];
dataset.forEach(function(d){
	data.push({ date : d3.timeParse("%Y-%m-%d")(d.date), value : eval(d.value) });
});
			console.log(dataset);
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_data/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:

  // Now I can use this data:

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { console.log(d);return d.date; }))
      .range([ 0, width ]);
console.log(x);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { console.log(d);return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0(y(0))
        .y1(function(d) { return y(d.value) })
      );
console.log(data);


			request.ResponseHeader().Set("Content-Type","image/svg+xml");
			println($('svg').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

