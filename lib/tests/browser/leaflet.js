//Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 39 KB of gzipped JS plus 4 KB of gzipped CSS code, it has all the mapping features most developers ever need.
//Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop and mobile platforms out of the box, taking advantage of HTML5 and CSS3 on modern browsers while being accessible on older ones too. It can be extended with a huge amount of plugins, has a beautiful, easy to use and well-documented API and a simple, readable source code that is a joy to contribute to.
//https://github.com/Leaflet/Leaflet
//https://leafletjs.com/
//https://maptimeboston.github.io/leaflet-intro/
//see also heat map
//http://leaflet.github.io/Leaflet.heat/demo/
define([
	"module",
	"jquery",
	"leaflet",
	"css!vendor/leaflet/1.7.1/leaflet.css"
],function(
	module,
	jq,
	L
){
	console.log([module.id,'start'].join(':'));
	console.log(L);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		#mapid { height: 180px; }
	`));
	{//basic usage
		var el=$(`<div id="mapid"></div>`);
		$("body").append(el);
		/*
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'your.mapbox.access.token'
		}).addTo(el[0]);
		*/
		// Creating map options
		var mapOptions = {
			center: [17.385044, 78.486671],
			zoom: 10
		}
		// Creating a map object
		var map = new L.map(el[0], mapOptions);
		// Creating a Layer object
		var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
		// Adding layer to the map
		map.addLayer(layer);
	}
});
