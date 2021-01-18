//Obscura is a small library of common image manipulation functions using canvas
//https://github.com/OiNutter/Obscura
//note:demo not working, fix up
define([
	"module",
	"jquery",
	"obscura",
],function(
	module,
	jq,
	obscura
){
	console.log([module.id,'start'].join(':'));
	console.log(obscura);
	{//basic usage

		var img=$("<img/>").attr({"src":"./lib/data/img/faces.jpg","id":"test0"});
		$("body").append(img);
		window.setTimeout(function(){//sync issues
			var camera = new obscura('#test0');
			camera.onLoad = function(){
				alert('ready');
				camera.resize(300);
				camera.rotate(32);
			}
		},500);

		//with image on file
		//var camera = new obscura('img/my-image.gif'[,'#target']);
	}
});
