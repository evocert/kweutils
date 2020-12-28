define([
	"module",
	"jquery",
	"svg"
],function(
	module,
	jq,
	SVG
){
	console.log([module.id,'start'].join(':'));
	var draw = SVG().addTo('body').size(300, 300)
	var rect = draw.rect(100, 100).attr({ fill: '#f06' })

});
