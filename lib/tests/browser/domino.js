define([
	"module",
	"cyclejs",
	"colorutils",
	"idutils",
	"domino",
	"jquery"
],function(
	module,
	cycle,
	colorutils,
	idutils,
	domino,
	jq
){
	$main=jq;
	console.log([module.id,'start'].join(':'));
	try{
		var t0=new Date();
		var window=domino.createWindow("");
		var document=window.document;
		require(["jquery"],function(jq){
			var $=jq;
			div=$("<div/>");
			div.append($('<style/>').text('*{font-family:monospace;font-weight:bold!important;font-size:12px;}p{margin:unset}table{border-collapse: collapse;}'));
			var id=idutils.uuidv4();
			div.append((function(){
				var ret=[];
				div.append($("<h3/>").text("jquery generated table").css({"color":"#FF0000"}));//chokes in goja
				var table=$("<table/>").attr("id",id);
				var rows=48;
				var cols=48;
				var idx=0;
				for(var i=0;i<rows;i++){
					var tr=$("<tr/>").attr("id","row"+i).addClass(i%2==0?"even":"odd");
					for(var j=0;j<cols;j++){
						var background=colorutils.hslToRgb(idx/(rows*cols),1,.5);
						tr.append(
							$("<td/>")
							.attr("id","col"+j)
							.attr("title",background)
							.addClass(j%2==0?"even":"odd")
							.text('')
							.css({"background":background})
							.css({"width":"8px"})//chokes in goja
							.css({"height":"8px"})//chokes in goja
						);
						idx++;
					}
					table.append(tr);
				}
				ret.push(table);
				return ret;
			})());
			var t1=new Date();
			var html=div.prop('outerHTML');
			$main('body').css({"background":"#020202"});
			$main('body').css({"color":"#888888"});
			$main('body').html(html);
			$main('body').prepend($main("<h3/>").text("Chrs:"+html.length));
			$main('body').prepend($main("<h3/>").text("Vdom Dur:"+(t1-t0)+" ms"));
		});
	}catch(e){
		console.error(e.toString());
	}
});
