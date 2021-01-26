//A Web Audio library
//https://alemangui.github.io/pizzicato/
define([
	"module",
	"pizzicato",
],function(
	module,
	Pizzicato
){
	console.log([module.id,"start"].join(":"));
	console.log(Pizzicato);
	{//basic usage
		var sineWave=new Pizzicato.Sound({ 
			source:"wave", 
			options:{type:"square",frequency:440}
		});
		var flanger=new Pizzicato.Effects.Flanger({
			time:0.85,
			speed:0.8,
			depth:0.1,
			feedback:0.8,
			mix:0.8
		});
		var lowPassFilter=new Pizzicato.Effects.LowPassFilter({
			frequency:400,
			peak:10
		});
		var ringModulator=new Pizzicato.Effects.RingModulator({
			speed:3,
			distortion:8,
			mix:0.5
		});
		sineWave.addEffect(flanger);
		sineWave.addEffect(lowPassFilter);
		sineWave.addEffect(ringModulator);
		sineWave.play();
		window.setTimeout(function(){
			sineWave.stop();
		},3000);
	}
	{//sound from function
		/*
		var whiteNoise=Pizzicato.Sound({
			source: 'script',
			options: {
				audioFunction: function(e) {
					var output = e.outputBuffer.getChannelData(0);
					for (var i = 0; i < e.outputBuffer.length; i++)
						output[i] = Math.random();
				}
			}
		});
		*/
		var whiteNoise=new Pizzicato.Sound(function(e){
			var output=e.outputBuffer.getChannelData(0);
			for(var i=0;i<e.outputBuffer.length;i++)
				output[i]=Math.random();
		});

		window.setTimeout(function(){
			whiteNoise.play();
		},3000);
		window.setTimeout(function(){
			whiteNoise.stop();
		},5000);
	}	
});
