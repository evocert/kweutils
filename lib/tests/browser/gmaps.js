define([
	"module",
	"jquery",
	"gmaps.core",
	"gmaps.controls",
	"gmaps.events",
	"gmaps.geofences",
	"gmaps.geometry",
	"gmaps.layers",
	"gmaps.map_types",
	"gmaps.markers",
	"gmaps.native_extensions",
	"gmaps.overlays",
	"gmaps.routes",
	"gmaps.static",
	"gmaps.streetview",
	"gmaps.styles",
	"gmaps.utils",
	/*
	*/
],function(
	module,
	jq,
	GMaps
){
	console.log([module.id,'start'].join(':'));
	console.log(GMaps);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		var el=$(`<div id="map"></div>`);
		$("body").append(el);
		var map = new GMaps({
			el: '#map',
			lat: -12.043333,
			lng: -77.028333
		});
	}
});
