//Drag and drop so simple it hurts
//Browser support includes every sane browser and IE7+. (Granted you polyfill the functional Array methods in ES5)
//Framework support includes vanilla JavaScript, Angular, and React.
//https://github.com/bevacqua/dragula/
define([
	"module",
	"jquery",
	"dragula",
	"css!vendor/dragula/3.7.3/dragula.min"
],function(
	module,
	jq,
	dragula
){
	console.log([module.id,'start'].join(':'));
	console.log(dragula);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.container{
			padding:8px;
			margin:8px;
			background:#22222;
			display:flex;
		}
		.container>#left,
		.container>#right{
			padding:8px;
			margin:8px;
			background:#444444;
			width:50%;
		}
		.container>#left>.item,
		.container>#right>.item{
			padding:8px;
			margin:8px;
			background:#555555;
		}
	`));
	{//basic demo
		var el=$(`
			<div class="container">
				<div id="left">
					<div class="item">item0</div>
					<div class="item">item1</div>
					<div class="item">item2</div>
					<div class="item">item3</div>
				</div>
				<div id="right">
					<div class="item">item4</div>
					<div class="item">item5</div>
					<div class="item">item6</div>
					<div class="item">item7</div>
				</div>
			</div>
		`);
		$("body").append(el);
		dragula([$('#left')[0],$('#right')[0]]);
	}
});
