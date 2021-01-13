//OpenLayers is a high-performance, feature-packed library for creating interactive maps on the web. It can display map tiles, vector data and markers loaded from any source on any web page. OpenLayers has been developed to further the use of geographic information of all kinds. It is completely free, Open Source JavaScript, released under the BSD 2-Clause License.
//https://github.com/openlayers/openlayers
//https://openlayers.org/
//https://openlayers.org/en/latest/doc/quickstart.html
define([
	"module",
	"jquery",
	"openlayers",
	"css!vendor/openlayers/6.5.0/ol.css"
],function(
	module,
	jq,
	ol
){
	console.log([module.id,'start'].join(':'));
	console.log(ol);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.map {
			height: 400px;
			width: 100%;
		}
	`));
	{//basic usage
		var el=$(`<div id="map" class="map"></div>`);
		$("body").append(el);
		var map = new ol.Map({
			target: 'map',
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
			],
			view: new ol.View({
				center: ol.proj.fromLonLat([37.41, 8.82]),
				zoom: 4
			})
		});
	}
});
