//A two way color conversion micro-library for Hexadecimal and RGB integer colors, weighing in at only 162 bytes gzipped. This micro-library is completely self contained with no external dependencies.
//https://github.com/daniellmb/HEX-RGB-Conversion
define([
	"module",
	"hex-rgb",
],function(
	module,
	hexRgb
){
	console.log([module.id,'start'].join(':'));
	console.log(hexRgb);
	{//basic usage
		const{toRGB,toHex}=hexRgb;
		console.log(toRGB("c0ffee"));
		console.log(toHex(192, 255, 238));
	}
});
