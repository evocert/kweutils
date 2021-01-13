//CesiumJS is a JavaScript library for creating 3D globes and 2D maps in a web browser without a plugin. It uses WebGL for hardware-accelerated graphics, and is cross-platform, cross-browser, and tuned for dynamic-data visualization.
//https://github.com/CesiumGS/cesium
//https://cesium.com/cesiumjs/
//note: too big 177mb inflated
define([
	"module",
	"tonejs",
],function(
	module,
	Tone
){
	console.log([module.id,'start'].join(':'));
	console.log(Tone);
	const osc = new Tone.Oscillator(880, "sine").toDestination().start();
	window.setTimeout(function(){
		osc.stop();
	},100);
});
