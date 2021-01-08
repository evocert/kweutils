define([
	"module",
	"console",
	"cyclejs",
	"tinycolor",
],function(
	module,
	console,
	cyclejs,
	tinycolor
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(tinycolor));
	{//basic usage
		//Hex,8-digit(RGBA)Hex
		console.log(tinycolor("#000"));
		console.log(tinycolor("000"));
		console.log(tinycolor("#369C"));
		console.log(tinycolor("369C"));
		console.log(tinycolor("#f0f0f6"));
		console.log(tinycolor("f0f0f6"));
		console.log(tinycolor("#f0f0f688"));
		console.log(tinycolor("f0f0f688"));

		//RGB,RGBA

		console.log(tinycolor("rgb(255,0,0)"));
		console.log(tinycolor("rgb25500"));
		console.log(tinycolor("rgba(255,0,0,.5)"));
		console.log(tinycolor({r:255,g:0,b:0}));
		console.log(tinycolor.fromRatio({r:1,g:0,b:0}));
		console.log(tinycolor.fromRatio({r:.5,g:.5,b:.5}));

		//HSL,HSLA

		console.log(tinycolor("hsl(0,100%,50%)"));
		console.log(tinycolor("hsla(0,100%,50%,.5)"));
		console.log(tinycolor("hsl(0,100%,50%)"));
		console.log(tinycolor("hsl01.00.5"));
		console.log(tinycolor({h:0,s:1,l:.5}));
		console.log(tinycolor.fromRatio({h:1,s:0,l:0}));
		console.log(tinycolor.fromRatio({h:.5,s:.5,l:.5}));

		//HSV,HSVA

		console.log(tinycolor("hsv(0,100%,100%)"));
		console.log(tinycolor("hsva(0,100%,100%,.5)"));
		console.log(tinycolor("hsv(0100%100%)"));
		console.log(tinycolor("hsv011"));
		console.log(tinycolor({h:0,s:100,v:100}));
		console.log(tinycolor.fromRatio({h:1,s:0,v:0}));
		console.log(tinycolor.fromRatio({h:.5,s:.5,v:.5}));

		//Named

		console.log(tinycolor("RED"));
		console.log(tinycolor("blanchedalmond"));
		console.log(tinycolor("darkblue"));
	}
	{//getformat
		var color = tinycolor("red");
		color.getFormat(); // "name"
		color = tinycolor({r:255, g:255, b:255});
		color.getFormat(); // "rgb"
	}
	{//getoriginalinput
		var color = tinycolor("red");
		color.getOriginalInput(); // "red"
		color = tinycolor({r:255, g:255, b:255});
		color.getOriginalInput(); // "{r: 255, g: 255, b: 255}"
	}
	{//isvalid
		var color1 = tinycolor("red");
		color1.isValid(); // true
		color1.toHexString(); // "#ff0000"

		var color2 = tinycolor("not a color");
		color2.isValid(); // false
		color2.toString(); // "#000000"
	}
	{//getbrightness
		var color1 = tinycolor("#fff");
		color1.getBrightness(); // 255

		var color2 = tinycolor("#000");
		color2.getBrightness(); // 0
	}
	{//islight
		var color1 = tinycolor("#fff");
		color1.isLight(); // true

		var color2 = tinycolor("#000");
		color2.isLight(); // false
	}
	{//isdark
		var color1 = tinycolor("#fff");
		color1.isDark(); // false

		var color2 = tinycolor("#000");
		color2.isDark(); // true
	}
	{//getluminance
		var color1 = tinycolor("#fff");
		color1.getLuminance(); // 1

		var color2 = tinycolor("#000");
		color2.getLuminance(); // 0
	}
	{//getalpha
		var color1 = tinycolor("rgba(255, 0, 0, .5)");
		color1.getAlpha(); // 0.5

		var color2 = tinycolor("rgb(255, 0, 0)");
		color2.getAlpha(); // 1

		var color3 = tinycolor("transparent");
		color3.getAlpha(); // 0
	}
	{//setalpha
		var color = tinycolor("red");
		color.getAlpha(); // 1
		color.setAlpha(.5);
		color.getAlpha(); // .5
		color.toRgbString(); // "rgba(255, 0, 0, .5)"
	}
	{//tohsv
		var color = tinycolor("red");
		color.toHsv(); // { h: 0, s: 1, v: 1, a: 1 }
	}
	{//tohsvstring
		var color = tinycolor("red");
		color.toHsvString(); // "hsv(0, 100%, 100%)"
		color.setAlpha(0.5);
		color.toHsvString(); // "hsva(0, 100%, 100%, 0.5)"
	}	
	{//tohsl
		var color = tinycolor("red");
		color.toHsl(); // { h: 0, s: 1, l: 0.5, a: 1 }
	}
	{//tohslstring
		var color = tinycolor("red");
		color.toHslString(); // "hsl(0, 100%, 50%)"
		color.setAlpha(0.5);
		color.toHslString(); // "hsla(0, 100%, 50%, 0.5)"
	}
	//...
});
