//https://github.com/joeax/svidget
define([
	"module",
	"jquery",
	"d3",
	"svidget",
],function(
	module,
	jq,
	d3,
	svidget
){
	console.log([module.id,'start'].join(':'));
	var urlbase=module.uri.substring(0,module.uri.lastIndexOf('/'));
	console.log(svidget);
	$=jq;
	//declarative
	//not works
	/*
	var div=$('<div/>').html(`
				<object class="obj" id="starinline" role="svidget" data="${urlbase+'/svidget/star.svg'}" type="image/svg+xml"
					width="200" height="200" style="border: 1px solid black">
					<param name="borderColor" value="darkgreen" />
					<param name="backgroundColor" value="green" />
					<param name="borderWidth" value="6" />
				</object>
	`);
	$('body').append(div);
	starWidget = svidget.widget(div);
	window.starWidget=starWidget;
	console.log('starWidget');
	console.log(starWidget);
	*/
	//works
	div=$("<div/>").attr("id","container0");
	$('body').append(div);
	var wid=svidget.load(div[0],urlbase+'/svidget/star.svg',{
		borderColor:"orange", 
		backgroundColor:"green",
		borderWidth:10 
	});
	window.setTimeout(function(){
		wid.param('backgroundColor').value('yellow');
	},500);
	window.setTimeout(function(){
		wid.param('backgroundColor').value('red');
	},1000);
	window.setTimeout(function(){
		wid.param('backgroundColor').value('green');
	},1500);
	return;
	/*
	$('body').html(`
			<div class="widget">
				<object class="obj" id="spinningStar" role="svidget" data="${urlbase+'/svidget/spinning-star.svg'}" type="image/svg+xml"
					width="200" height="200" style="border: 1px solid black">
					<param name="borderColor" value="darkgreen" />
					<param name="backgroundColor" value="green" />
					<param name="borderWidth" value="6" />
				</object>
			</div>
	`);
	//declarative
	starWidget = svidget.widget("spinningStar");
	console.log(starWidget);
	*/
	//programattic
	/*
	svidget.load('body',svgurl,{
		borderColor: "orange", 
		backgroundColor: "green",
		borderWidth: 10 
	});
	*/
});
