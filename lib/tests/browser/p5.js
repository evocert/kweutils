//https://github.com/processing/p5.js-sound/issues/44
//https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
//https://codeburst.io/p5-js-tutorial-for-beginners-make-a-music-visualization-bb747c4cd402
define([
	"module",
	"jquery",
	"idutils",
	"p5",
],function(
	module,
	jq,
	idutils,
	p5	
){
	console.log([module.id,'start'].join(':'));
	console.log(p5);
	$=jq;
	$('body').append($("<style/>").text(`
		canvas.p5Canvas{
			border:2px solid #222222;
			background:#222222;
		}
	`));
	{
		var id=idutils.uuidv4();
		$('body').append($("<div/>").attr('id',id));
		//https://p5js.org/reference/#/p5/p5
		//https://p5js.org/examples/instance-mode-instantiation.html
		//https://stackoverflow.com/questions/55113740/instantiating-object-in-p5-js-instance-mode
		//https://necromuralist.github.io/p5_explorations/posts/p5-instance-mode-revisited/
		//https://forum.processing.org/two/discussion/17332/using-instance-mode-to-create-multiple-sketches-on-the-same-page
		//https://discourse.processing.org/t/how-to-adapt-a-library-for-instance-mode-p5js/11775
		//http://joemckaystudio.com/multisketches/
		var p5obj=new p5(function(p) {//p5 instance mode
			//this=p;
			window.p=p;
			(function(){
				var width=320;
				var height=240;
				p.setup=function() {
					p.createCanvas(width,height);
					//https://stackoverflow.com/questions/44473861/how-to-add-p5-dom-to-p5-js-in-instance-mode
					//system = new ParticleSystem(createVector(width / 2, 50));//trouble with this/p???
				};
				p.draw=function() {
					var w=50;
					var h=50;
					var x=width/2-w/2;
					var y=height/2-w/2;
					p.background(0);
					p.fill(255);
					p.rect(x,y,w,h);
				};
			}).call(p,p);
		},id);
	}
	{
		var id=idutils.uuidv4();
		$('body').append($("<div/>").attr('id',id));
		var p5obj=new p5(function(p) {//p5 instance mode
			//this=p;
			window.p=p;
			(function(){
				var width=320;
				var height=240;
				p.setup=function() {
					p.createCanvas(width,height);
				};
				p.draw=function() {
					var w=50;
					var h=50;
					var x=width/2-w/2;
					var y=height/2-w/2;
					p.background(0);
					p.fill(255);
					p.rect(x,y,w,h);
				};
			}).call(p,p);
		},id);
	}
});
