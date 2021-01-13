//Clappr is an extensible media player for the web. Your architecture is projected primarily into plugins, adding low accoupling by design to the project and the possibility to add infinitely features easily.
//Clappr uses by default the HTMLVideoElement which guarantees support to many platforms. You have the possibility to extends the default HTML5 playback or the playback interface to create one new media support just like a plugin!
//Clappr is a composition of two other projects: @clappr/core and @clappr/plugins.
//The @clappr/core contains the basic functionalities from Clappr (plugin architecture, class abstractions, public interfaces, events handlers and etc) and the @clappr/plugins are the repository where the plugins maintained by the Clappr team lives. More info about those projects into your repositories.
//All Clappr projects are written in *.js using the latest features of ECMAScript.
//Clappr is under development but production-ready. Feel free to open issues and send pull requests.
//https://github.com/clappr/clappr
//note: plugins
//External Plugins
//Plugin 	Status 	Compatible with latest Clappr 	URL
//Thumbnails on seekbar 	Ready 	Yes 	https://github.com/tjenkinson/clappr-thumbnails-plugin
//Markers 	Ready 	Yes 	https://github.com/tjenkinson/clappr-markers-plugin
//Level Selector 	Ready 	Yes 	https://github.com/clappr/clappr-level-selector-plugin
//360 videos 	Ready 	Yes 	https://github.com/thiagopnts/video-360
//Chromecast 	Ready 	Yes 	https://github.com/clappr/clappr-chromecast-plugin
//DASH with shaka 	Ready 	Yes 	https://github.com/clappr/dash-shaka-playback
//Playback Speed 	Ready 	Yes 	https://github.com/bikegriffith/clappr-playback-rate-plugin
//Clappr Stats 	Ready 	Yes 	https://github.com/leandromoreira/clappr-stats
//Clappr Nerd Stats 	Ready 	Yes 	https://github.com/lucasrodcosta/clappr-nerd-stats
//Pause while far 	Ready 	Yes 	https://github.com/leandromoreira/clappr-pause-tab-visibility
//RTMP 	Ready 	Yes 	https://github.com/clappr/clappr-rtmp-plugin
//Picture-in-Picture 	Ready 	Yes 	https://github.com/tjenkinson/clappr-pip-plugin
//Hybrid P2P & CDN 	Ready 	Yes 	https://support.streamroot.io/hc/en-us/articles/360000913654-Clappr
//Comments on seekbar 	Ready 	? 	https://github.com/Metrakit/clappr-comment-plugin
//Voice control 	Ready 	? 	https://github.com/flavioribeiro/clappr-speech-control-plugin
//Dash 	WIP 	No 	https://github.com/shankardevy/clappr-dash-plugin
//Youtube 	Ready 	No 	https://github.com/towerz/clappr-youtube-playback
//Googel IMA Pre Roll 	Ready 	Yes 	https://github.com/kslimani/clappr-google-ima-html5-preroll
//VAST Ad plugin 	WIP 	No 	https://github.com/vix-simplex/clappr-ad-plugin
//Dynamic Overlay 	Ready 	Yes 	https://github.com/Lethea/clappr-dynamic-text-overlay
//Scroll Text Overlay 	Ready 	Yes 	https://github.com/Lethea/clappr-marquee-overlay
//Playback Speed Controller 	Ready 	Yes 	https://github.com/Lethea/clapper-playback-speed-plugin-extended
//FLV 	Ready 	Yes 	https://github.com/andrefilimono/clappr-flvjs-playback
//Context Menu 	Ready 	Yes 	https://github.com/joaopaulovieira/clappr-context-menu-plugin
//External Integrations
//Integration 	Status 	Compatible with latest Clappr 	URL
//P2P Media Loader 	Ready 	Yes 	https://github.com/Novage/p2p-media-loader
define([
	"module",
	"jquery",
	"clappr",
],function(
	module,
	jq,
	Clappr
){
	console.log([module.id,'start'].join(':'));
	console.log(Clappr);
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
		var el=$("<div/>").attr({"id":"player"});
		$("body").append(el);
		var player = new Clappr.Player({source: "//vjs.zencdn.net/v/oceans.mp4", parentId: "#player"});
	}
});
