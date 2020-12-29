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
		//require(["jquery","d3","d3-3d","colorutils"],function(jq,d3,d33d,colorutils){
		require(["jquery","vendor/d3/4.13.0/d3.v4.min","d3-3d","colorutils"],function(jq,d3,d33d,colorutils){
			console.log('d3');
			$=jq;
			$('body').append($('<style/>').text("svg{background: linear-gradient(#000000,#111111);}"));
			var origin=[480,300],
				j=10,
				scale=20,
				scatter=[],
				yLine=[],
				xGrid=[],
				beta=1,
				alpha=0,
				key=function(d){return d.id;},
				startAngle=Math.PI/4;
			var svg=d3.select("body")
				.append("svg")
				.attr('width',960)
				.attr('height',580)
				//.call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd))
				.append('g');
			var color  = 'red';//d3.scaleOrdinal(d3.schemeCategory20);
			var mx, my, mouseX, mouseY;

			var grid3d = d33d._3d()
				.shape('GRID', 20)
				.origin(origin)
				.rotateY( startAngle)
				.rotateX(-startAngle)
				.scale(scale);

			var point3d = d33d._3d()
				.x(function(d){ return d.x; })
				.y(function(d){ return d.y; })
				.z(function(d){ return d.z; })
				.origin(origin)
				.rotateY( startAngle)
				.rotateX(-startAngle)
				.scale(scale);

			var yScale3d = d33d._3d()
				.shape('LINE_STRIP')
				.origin(origin)
				.rotateY( startAngle)
				.rotateX(-startAngle)
				.scale(scale);

			function processData(data, tt){

				// ----------- GRID ----------- 

				var xGrid = svg.selectAll('path.grid').data(data[0], key);
				xGrid
					.enter()
					.append('path')
					.attr('class', '_3d grid')
					.merge(xGrid)
					.attr('stroke', '#FFFFFFCC')
					.attr('stroke-width', 0.5)
					//.attr('fill', function(d){ return '#000022' })//return d.ccw ? 'lightgrey' : '#717171'; })
					.attr('fill-opacity', 0.0)
					.attr('d', grid3d.draw);

				xGrid.exit().remove();

				// ----------- POINTS ----------- 
				var points = svg.selectAll('circle').data(data[1], key);
				points
					.enter()
					.append('circle')
					.attr('class', '_3d')
					.attr('opacity', 0)
					.attr('cx', posPointX)
					.attr('cy', posPointY)
					.merge(points)
					//.transition().duration(tt)
					.attr('r', 3)
					//.attr('stroke', function(d){ return 'blue';})//return d3.color(color(d.id)).darker(3); })
					//.attr('stroke', function(d){return colorutils.hslaToRgba(1,1,(d.y)/10,.5)})//return d3.color(color(d.id)).darker(3); })
				//colorutils.hslToRgb(Math.random(),1,0.5)
					//.attr('fill', function(d){ return 'red';})//return color(d.id); })
					//.attr('fill', function(d){console.log(d); return 'yellow';})//return color(d.id); })
					.attr('fill', function(d){
						var fill=colorutils.hslaToRgba((d.y)/10,1,.5,.75);//(d.y)/10,.5,1,1);//1,.9);
						return fill;
						//return "#FFFFFF";
					})//return d3.color(color(d.id)).darker(3); })

					.attr('opacity', .5)
					.attr('cx', posPointX)
					.attr('cy', posPointY);

				points.exit().remove();

				// ----------- y-Scale ----------- 

				var yScale = svg.selectAll('path.yScale').data(data[2]);

				yScale
					.enter()
					.append('path')
					.attr('class', '_3d yScale')
					.merge(yScale)
					.attr('stroke', '#FFFFFF')
					.attr('stroke-width', .5)
					.attr('d', yScale3d.draw);

				yScale.exit().remove();

				 // ----------- y-Scale Text ----------- 

				var yText = svg.selectAll('text.yText').data(data[2][0]);

				yText
					.enter()
					.append('text')
					.attr('stroke', '#FFFFFF88')
					.attr('class', '_3d yText')
					.attr('dx', '.3em')
					.merge(yText)
					.each(function(d){
						d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
					})
					.attr('x', function(d){ return d.projected.x; })
					.attr('y', function(d){ return d.projected.y; })
					.text(function(d){ return d[1] <= 0 ? d[1] : ''; });

				yText.exit().remove();

				d3.selectAll('._3d').sort(d33d._3d().sort);
			}

			function posPointX(d){
				return d.projected.x;
			}

			function posPointY(d){
				return d.projected.y;
			}

			function init(){
				var cnt = 0;
				xGrid = [], scatter = [], yLine = [];
				//for(var z = -j; z < j; z++){
				for(var z = -j; z < j; z+=1){
					///for(var x = -j; x < j; x++){
					for(var x = -j; x < j; x+=1){
						xGrid.push([x, 1, z]);
					}
				}
				for(var z = -j; z < j; z+=.5){
					///for(var x = -j; x < j; x++){
					for(var x = -j; x < j; x+=.5){
						//scatter.push({x: x, y: d3.randomUniform(0, -10)(), z: z, id: 'point_' + cnt++});
						scatter.push({x: x, y: -Math.random()*10, z: z, id: 'point_' + cnt++});
						
					}
				}
				d3.range(-1, 11, 1).forEach(function(d){ yLine.push([-j, -d, -j]); });
				var data = [
					grid3d(xGrid),
					point3d(scatter),
					yScale3d([yLine])
				];
				processData(data, 1000);
			}
			init();
			println($('svg').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

