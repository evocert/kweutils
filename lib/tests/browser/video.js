//Video.js is a web video player built from the ground up for an HTML5 world. It supports HTML5 video and Media Source Extensions, as well as other playback techs like YouTube and Vimeo (through plugins). It supports video playback on desktops and mobile devices. This project was started mid 2010, and the player is now used on over 50,000 100,000 200,000 400,000 600,000 websites.
//https://github.com/videojs/video.js
//https://github.com/videojs/video.js/issues/5680
//https://videojs.com
//https://videojs.com/getting-started
define([
	"module",
	"jquery",
	"videojs",
	"css!vendor/videojs/7.10.2/video-js.min"
],function(
	module,
	jq,
	videojs
){
	console.log([module.id,'start'].join(':'));
	console.log(videojs);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//declarative
		$("body").append($(`
			<video
					id="my-player"
					class="video-js"
					controls
					preload="auto"
					poster="//vjs.zencdn.net/v/oceans.png"
					data-setup='{}'>
				<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
				<source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
				<source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
				<p class="vjs-no-js">
					To view this video please enable JavaScript, and consider upgrading to a
					web browser that
					<a href="https://videojs.com/html5-video-support/" target="_blank">
						supports HTML5 video
					</a>
				</p>
			</video>
		`));
		$("body").append($("<hr/>"));
	}
	{//programmatic
		$("body").append($(`
			<video
					id="my-player"
					class="video-js"
					controls
					preload="auto"
					poster="//vjs.zencdn.net/v/oceans.png"
				<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
				<source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
				<source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
				<p class="vjs-no-js">
					To view this video please enable JavaScript, and consider upgrading to a
					web browser that
					<a href="https://videojs.com/html5-video-support/" target="_blank">
						supports HTML5 video
					</a>
				</p>
			</video>
		`));
		$("body").append($("<hr/>"));
		var options = {};
		var player = videojs('my-player', options, function onPlayerReady() {
			videojs.log('Your player is ready!');

			// In this context, `this` is the player that was created by Video.js.
			this.play();

			// How about an event listener?
			this.on('ended', function() {
				videojs.log('Awww...over so soon?!');
			});
		});
	}

});
