//https://github.com/gka/chroma.js
//https://gka.github.io/chroma.js/
define([
	"module",
	"chroma",
],function(
	module,
	chroma
){
	console.log([module.id,'start'].join(':'));
	console.log(chroma);
	{
	console.log(chroma('#D4F880').darken().hex());
	}
	{
		scale = chroma.scale(['white', 'red']);
		console.log(scale(0.5).hex());
		console.log("----------------------------------------");
	}
	{
		var scal=chroma.scale(['white', 'red']).mode('lab');
		for(var i=0;i<=1;i+=0.1){
			console.log(scal(i));
		}
		console.log("----------------------------------------");
	}
	{
		var scal=chroma.scale(['#ff0000', '#00ffff'])
		for(var i=0;i<=1;i+=0.1){
			console.log(scal(i));
		}
		console.log("----------------------------------------");
	}
});
