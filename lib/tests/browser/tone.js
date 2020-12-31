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
