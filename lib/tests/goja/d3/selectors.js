define([
	"module",
	"console",
	"idutils",
	"LoremIpsum",
	"colorutils",
	"cyclejs",
	"window",
	"document",
],function(
	module,
	console,
	idutils,
	LoremIpsum,
	colorutils,
	cyclejs,
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
			var $=jq;
			$('body').append($('<style/>').text('*{font-family:monospace;font-weight:bold;font-size:12px;}p{margin:unset}table{border-collapse: collapse;}'));
			$("body").append($("<h3/>").text("jquery paragraphs, d3 manipulated"));
			$('body').append((function(){
				var ret=[];
				var lorem=new LoremIpsum();
				var nitr=8;
				for(var i=0;i<nitr;i++){
					ret.push($('<p/>').text(lorem.sentence(8,32)).attr("id","p"+i).css("color","rgba(255,0,0,1.0)"));//colorutils.hslToRgb(i/nitr,1,.5)));
				}
				return ret;
			})());
			{
				var id=idutils.uuidv4();
				$('body').append((function(){
					var ret=[];
					$("body").append($("<h3/>").text("jquery generated table, d3 manipulated"));
					var table=$("<table/>").attr("id",id);
					var rows=8;
					var cols=8;
					var idx=0;
					for(var i=0;i<rows;i++){
						var tr=$("<tr/>").attr("id","row"+i).addClass(i%2==0?"even":"odd");
						for(var j=0;j<cols;j++){
							tr.append($("<td/>").attr("id","col"+j).addClass(j%2==0?"even":"odd").text(idx++));
						}
						table.append(tr);
					}
					ret.push(table);
					return ret;
				})());
				d3.select("p").style("color","rgba(0,255,0,1.0)");
				d3.select("#p1").style("color","rgba(0,255,255,1.0)");
				d3.select("#p2").style("color","rgba(255,255,0,1.0)");
				d3.select("#p3").style("color","rgba(255,0,255,1.0)");
				d3.select("#p4").style("color","rgba(255,255,255,1.0)");
				d3.selectAll("#"+id+" "+"tr.odd").style("background","rgba(128,0,0,1.0)");
				d3.selectAll("#"+id+" "+"tr.even").selectAll('td.even').style("background","rgba(128,64,0,1.0)");
				d3.selectAll("#"+id+" "+"tr.even").selectAll('td.odd').style("background","rgba(65,128,0,1.0)");
				d3.selectAll("#"+id+" "+"tr.odd").selectAll('td.even').style("color","rgba(0,255,0,1.0)");
				d3.selectAll("#"+id+" "+"tr.odd").selectAll('td.odd').style("color","rgba(255,0,255,1.0)");
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				$('body').append((function(){
					var ret=[];
					$("body").append($("<h3/>").text("jquery generated table"));
					var table=$("<table/>").attr("id",id);
					var rows=10;
					var cols=10;
					var idx=0;
					for(var i=0;i<rows;i++){
						var tr=$("<tr/>").attr("id","row"+i).addClass(i%2==0?"even":"odd");
						for(var j=0;j<cols;j++){
							tr.append(
								$("<td/>")
								.attr("id","col"+j)
								.addClass(j%2==0?"even":"odd")
								.text(idx)
								.css({"background":colorutils.hslToRgb(idx/(rows*cols),1,.5)})
								.css({"color":colorutils.hslToRgb(1-idx/(rows*cols),1,.5)})
							);
							idx++;
						}
						table.append(tr);
					}
					ret.push(table);
					return ret;
				})());
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 generated table");
				var table=d3.select("body").append("table")
				table.attr("id",id);
				var rows=10;
				var cols=10;
				var idx=0;
				for(var i=0;i<rows;i++){
					var tr=table.append("tr");
					for(var j=0;j<cols;j++){
						tr.append("td")
							.text(idx)
							.classed("even",j%2==0)
							.classed("odd",j%2==1)
							.style("background",colorutils.hslToRgb(idx/(rows*cols),1,.5))
							.style("color",colorutils.hslToRgb(1-idx/(rows*cols),1,.5))
						;
						idx++;
					}
				}
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 function data");
				var div=d3.select("body").append("div").attr("id",id);
				var data=[1,2,3,4];
				data.forEach(function(){
					div.append("p");
				});
				div.selectAll("p").data(data).text(function(d,i){
					console.log(JSON.stringify(cyclejs.decycle(d)));//data element
					console.log(JSON.stringify(cyclejs.decycle(i)));//data index
					//console.log(cyclejs.decycle(this));//dom node
					return d
				});
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 setting attributes based on contents");
				var div=d3.select("body").append("div").attr("id",id);
				div.append('span').text("Info");
				div.append('span').text("Warning");
				div.append('span').text("Danger");
				div.append('span').text("Error");
				div.append('span').text("Dark");
				div.selectAll('span')
					.style(
						"background",
						function(d,i){
							switch($(this).text().toLowerCase()){
								case "success":
									return "#00FF00";//cssparser.js chokes on hex colors for goja, added rudimentary fix
									break;
								case "info":
									return "rgb(0,0,255)";
									break;
								case "warning":
									return "brown";
									break;
								case "danger":
									return "yellow";
									break;
								case "error":
									return "red";
									break;
								case "dark":
									return "rgba(255,255,255,0.1)";
									break;
								default:
									return "black";
									break;
							}
						}
					)
					.style('padding','8px')//cssparser.js chokes on NUMpx instead of NUM px, added rudimentary fix for goja
					.style('border-radius','2.3px')
					.style('margin','4.56px')
				;
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 events");
				var div=d3.select("body").append("div").attr("id",id);
				var span=div.append('span').text('some text');
				span.on('click',function(){
					console.log('clicked span');
					d3.select(this).style('background','red');
				});
				$(span.node()).click();
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 transitions");
				d3.select("body").append("p").text("will not work in domino, no clearTimeout...");
				/*
				var div=d3.select("body").append("div").attr("id",id);
				var span=div.append('span').text('some text');
				span
					.transition()
					.duration(1000)
					.style("background-color", "red");
				*/
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 data");
				var div=d3.select("body").append("div");
				//set up data
				var ndat=16;
				var dat=[];
				var lorem=new LoremIpsum();
				for(var i=0;i<ndat;i++){
					dat.push({
						text:lorem.sentence(8,8),
						color:colorutils.hslToRgb(i/ndat,1,.5)
					})
				}
				//set up paragraphs
				for(var i=0;i<ndat;i++){
					div.append('p');
				}
				var p=div
					.selectAll("p")
					.data(dat)
					.text(function (d) {
						return d.text;
					})
					.style('color',function (d) {
						return d.color;
					})
				;
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 enter");
				var div=d3.select("body").append("div");
				var data=[4,1,6,2,8,9];
				var body=div
					.selectAll("span")
					.data(data)
					.enter()
					.append("span")
					.text(function(d){return d+" ";});
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 access bound data");
				var div=d3.select("body").append("div");
				var data=[4,1,6,2,8,9];
				div
					.selectAll("span")
					.data(data)
					.enter()
					.append("span")
					.text(function(d){return d+" ";});
				/* not working ?
				div
					.selectAll("span")
					.data(function(d){
						console.log(d);
					});
				;
				*/
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 datum - static data");
				var div=d3.select("body").append("div");
				div
					.datum(42)
					.append("span")
					.text(function(d){return d+" ";});
				d3.select("body").append("hr");
			}
			{
				//https://stackoverflow.com/questions/41154231/d3-how-do-i-parse-a-csv-string-into-an-object-where-keys-are-column-names-and-v
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 datum - parse csv string");
				var div=d3.select("body").append("div");
				var csv=(function(){
					var ret='';
					var headers='xyz'.split('');
					ret+=headers.join(',')+'\n';
					for(var i=0;i<3;i++){
						var row=[];
						for(var j=0;j<headers.length;j++){
							row.push(Math.random());
						}
						ret+=row.join(',')+'\n';
					}
					return ret;
				})();
				div.append('pre').text(csv);
				var data=d3.csv.parse(csv);
				var headers=d3.keys(data[0]);
				var table=div.append('table');
				var tr=table.append('tr');
				headers.forEach(function(col){
					tr.append('th').text(col);
				});
				data.forEach(function(row){
					var tr=table.append('tr');
					headers.forEach(function(col){
						var val=parseFloat(row[col]);
						tr.append('td')
							.style('background',function(d,i){
								return colorutils.hslToRgb(val,.5,.5);
							})
							.style('color',function(d,i){
								return colorutils.hslToRgb(1-val,1,.5);
							})
							.text(val.toFixed(1));
					});
				});
				d3.select("body").append("hr");
			}
			{
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 datum - parse tsv string");
				var div=d3.select("body").append("div");
				var tsv=(function(){
					var ret='';
					var headers='xyz'.split('');
					ret+=headers.join("\t")+'\n';
					for(var i=0;i<3;i++){
						var row=[];
						for(var j=0;j<headers.length;j++){
							row.push(Math.random());
						}
						ret+=row.join("\t")+'\n';
					}
					return ret;
				})();
				div.append('pre').text(tsv);
				var data=d3.tsv.parse(tsv);
				var headers=d3.keys(data[0]);
				var table=div.append('table');
				var tr=table.append('tr');
				headers.forEach(function(col){
					tr.append('th').text(col);
				});
				data.forEach(function(row){
					var tr=table.append('tr');
					headers.forEach(function(col){
						var val=parseFloat(row[col]);
						tr.append('td')
							.style('background',function(d,i){
								return colorutils.hslToRgb(val,.5,.5);
							})
							.style('color',function(d,i){
								return colorutils.hslToRgb(1-val,1,.5);
							})
							.text(val.toFixed(1));
					});
				});
				d3.select("body").append("hr");
			}
			{
				//???
				/*
				var id=idutils.uuidv4();
				d3.select("body").append("h3").text("d3 datum - parse xml string");
				var div=d3.select("body").append("div");
				var xml=(function(){
					return
						'<?xml version="1.0" encoding="UTF-8"?>\n'+
						'	<root>\n'+
						'	<row>\n'+
						'	    <x>0</x>\n'+
						'	    <y>0.25</y>\n'+
						'	</row>\n'+
						'	<row>\n'+
						'	    <x>0.75</x>\n'+
						'	    <y>1</y>\n'+
						'	</row>\n'+
						'</root>\n'
				})();
				div.append('pre').text(xml);
				var data=d3.xml.parse(xml);
				var headers=d3.keys(data[0]);
				var table=div.append('table');
				var tr=table.append('tr');
				headers.forEach(function(col){
					tr.append('th').text(col);
				});
				data.forEach(function(row){
					var tr=table.append('tr');
					headers.forEach(function(col){
						var val=parseFloat(row[col]);
						tr.append('td')
							.style('background',function(d,i){
								return colorutils.hslToRgb(val,.5,.5);
							})
							.style('color',function(d,i){
								return colorutils.hslToRgb(1-val,1,.5);
							})
							.text(val.toFixed(1));
					});
				});
				d3.select("body").append("hr");
				*/
			}

			//request.ResponseHeader().Set("Content-Type","image/svg+xml");
			request.ResponseHeader().Set("Content-Type","text/html");

			//println($('body').prop('outerHTML'));
			println($('body').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});

