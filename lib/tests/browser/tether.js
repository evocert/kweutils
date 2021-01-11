//Tether is a small, focused JavaScript library for defining and managing the position of user interface (UI) elements in relation to one another on a web page. It is a tool for web developers building features that require certain UI elements to be precisely positioned based on the location of another UI element.
//https://github.com/shipshapecode/tether
//http://tether.io/#usage
//note: requires a reload or something, theres some bug the thing does not render unless the screen is resized or moved
define([
	"module",
	"jquery",
	"tether",
],function(
	module,
	jq,
	Tether
){
	console.log([module.id,'start'].join(':'));
	console.log(Tether);
	{//basic usage
		$=jq;
		$("body").append($("<style/>").text(`
			body,html{
				background:#222222;
				color:#CCCCCC;
				font-family:monospace;
				padding:48px;
			}
			.container{
				padding:8px;
				background:#444444;
				border:1px solid #888888;
				border-radius:4px;
			}
			img{
				width:100%;
			}
			.comments{
				margin-top:8px;
				padding:4px;
				background:#666666;
			}
			.tooltip{
				background:#888888;
				padding:8px;
				border-radius:4px;
				border:1px solid #CCCCCC;
				color:#CCCCCC;
			}
		`));
		$("body").append($(`
			<div class="container">
				<img src="lib/data/img/faces.jpg" alt="Awesome Picture" class="picture">
				<div class="comments">
					Some Comments
				</div>
			</div>
		`));
		var info=$("<div/>").attr({"id":"info"}).addClass("tooltip").text("tooltip");
		$("body").append(info);
		var t=new Tether({
			element:"#info",
			target:".picture",
			attachment: 'top right',
			targetAttachment: 'top left'
		});
		window.t=t;
	}
});
