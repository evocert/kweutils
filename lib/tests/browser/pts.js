//https://ptsjs.org/demo/?name=color.HSLtoRGB
//https://github.com/williamngan/pts/tree/master/demo
define([
	"module",
	"pts",
],function(
	module,
	Pts
){
	console.log([module.id,'start'].join(':'));
	console.log(Pts);
	var run=Pts.quickStart("pt","#f03"); 
	// Pass an animate callback function to run
	run((time,ftime)=>{
		let subs=space.innerBound.map((p)=>Line.subpoints([p,space.pointer],30));
		let rects=Util.zip(subs).map((r,i)=>Rectangle.corners(r).rotate2D(i*Math.PI/60,space.pointer));
		form.strokeOnly("#FDC",2).polygons(rects);
	});
});
