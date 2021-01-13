//AmplitudeJS is a lightweight JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required). AmplitudeJS is available under the MIT License.
//https://github.com/521dimensions/amplitudejs
//https://521dimensions.com/open-source/amplitudejs/docs/installation/initialization.html
//https://521dimensions.com/open-source/amplitudejs/docs/examples/visualization-player.html
define([
	"module",
	"jquery",
	"amplitude",
	"amplitude.bar",
	"amplitude.frequencyanalyzer",
	"amplitude.michaelbromley",
	"amplitude.template",
],function(
	module,
	jq,
	Amplitude
){
	console.log([module.id,'start'].join(':'));
	console.log(Amplitude);
	window.Amplitude=Amplitude;//visualizion plugin unscoped
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
		$("body").append($("<style/>").text(`
			/*
				1. Base
			*/
			html, body {
				background-color: #333;
			font-family: "Lato", sans-serif;}

			div#pre-load-img-container {
				display: none; }

			/*
				2. Components
			*/
			div.top-container {
				margin-bottom: 40px;
				position: relative; }
				div.top-container div.amplitude-visualization {
					width: 200px;
					height: 200px;
					box-shadow: 0 5px 31px 0 rgba(0, 0, 0, 0.5);
					margin: auto;
					background-color: black; }
				div.top-container img.now-playing-album-art {
					width: 200px;
					margin: auto;
					box-shadow: 0 5px 31px 0 rgba(0, 0, 0, 0.5);
					display: none; }
				div.top-container div.visualization-toggle {
					width: 24px;
					height: 24px;
					top: 0;
					right: 8px;
					cursor: pointer;
					position: absolute; }
					div.top-container div.visualization-toggle.visualization-on {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/visualization-on.svg") no-repeat center; }
					div.top-container div.visualization-toggle.visualization-off {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/visualization-off.svg") no-repeat center; }
				div.top-container div.amplitude-shuffle {
					width: 22px;
					height: 13px;
					cursor: pointer;
					top: 48px;
					right: 10px;
					position: absolute; }
					div.top-container div.amplitude-shuffle.amplitude-shuffle-on {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/shuffle-on.svg") no-repeat center; }
					div.top-container div.amplitude-shuffle.amplitude-shuffle-off {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/shuffle-off.svg") no-repeat center; }
				div.top-container div.amplitude-repeat {
					width: 25px;
					height: 15px;
					cursor: pointer;
					top: 85px;
					right: 8px;
					position: absolute; }
					div.top-container div.amplitude-repeat.amplitude-repeat-on {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/repeat-on.svg") no-repeat center; }
					div.top-container div.amplitude-repeat.amplitude-repeat-off {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/repeat-off.svg") no-repeat center; }

			/*
				Small only
			*/
			/*
				Medium only
			*/
			/*
				Large Only
			*/
			div.control-container {
				margin-top: 40px;
				display: flex; }
				div.control-container div.amplitude-prev {
					width: 18px;
					height: 24px;
					background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/prev.svg");
					background-size: cover;
					cursor: pointer;
					margin: auto;
					margin-top: 10px; }
				div.control-container div.amplitude-play-pause {
					width: 30px;
					height: 44px;
					cursor: pointer;
					margin: auto; }
					div.control-container div.amplitude-play-pause.amplitude-playing {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/pause.svg") no-repeat center; }
					div.control-container div.amplitude-play-pause.amplitude-paused {
						background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/play.svg") no-repeat center; }
				div.control-container div.amplitude-next {
					width: 18px;
					height: 24px;
					background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/next.svg");
					background-size: cover;
					cursor: pointer;
					margin: auto;
					margin-top: 10px; }

			/*
				Small only
			*/
			/*
				Medium only
			*/
			/*
				Large Only
			*/
			div.meta-data-container {
				margin-top: 40px; }
				div.meta-data-container span.now-playing-name {
					display: block;
					text-align: center;
					margin-bottom: 15px;
					font-size: 28px;
					font-weight: 700;
					color: white;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis; }
				div.meta-data-container span.now-playing-artist-album {
					display: block;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 14px;
					color: rgba(255, 255, 255, 0.7); }

			/*
				Small only
			*/
			/*
				Medium only
			*/
			/*
				Large Only
			*/
			div.amplitude-wave-form {
				margin-top: 25px;
				margin-bottom: 12px; }
				div.amplitude-wave-form svg {
					stroke: url(#gradient);
					height: 50px;
					width: 100%;
					stroke-width: .5px; }
					div.amplitude-wave-form svg g {
						stroke: url(#gradient);
						height: 50px;
						width: 100%; }
						div.amplitude-wave-form svg g path {
							stroke: url(#gradient);
							height: 50px;
							width: 100%; }

			span.amplitude-current-time {
				display: block;
				text-align: left;
				color: white;
				font-size: 12px; }

			span.amplitude-time-remaining {
				display: block;
				text-align: right;
				color: white;
				font-size: 12px; }

			div.song-navigation {
				margin-top: 50px;
				margin-bottom: 25px; }
				div.song-navigation input[type="range"] {
					width: 90%;
					-webkit-appearance: none;
					z-index: 9999;
					background-color: inherit;
					margin-left: auto;
					margin-right: auto;
					display: block; }
				div.song-navigation input[type="range"]:focus {
					outline: none; }
				div.song-navigation input[type="range"]::-webkit-slider-runnable-track {
					width: 100%;
					height: 4px;
					cursor: pointer;
					border-radius: 0px;
					background: rgba(255, 255, 255, 0.25); }
				div.song-navigation input[type="range"]::-webkit-slider-thumb {
					width: 28px;
					height: 28px;
					background-color: white;
					border-radius: 20px;
					-webkit-appearance: none;
					margin-top: -10px; }
				div.song-navigation input[type="range"]::-moz-range-track {
					width: 100%;
					height: 4px;
					cursor: pointer;
					border-radius: 0px;
					background: rgba(255, 255, 255, 0.25); }
				div.song-navigation input[type="range"]::-moz-range-thumb {
					width: 28px;
					height: 28px;
					background-color: white;
					border-radius: 20px;
					-webkit-appearance: none;
					margin-top: -10px; }
				div.song-navigation input[type="range"]::-ms-track {
					width: 100%;
					height: 4px;
					cursor: pointer;
					border-radius: 0px;
					background: rgba(255, 255, 255, 0.25); }
				div.song-navigation input[type="range"]::-ms-fill-lower {
					background: transparent; }
				div.song-navigation input[type="range"]::-ms-fill-upper {
					background: transparent; }
				div.song-navigation input[type="range"]::-ms-thumb {
					width: 28px;
					height: 28px;
					background-color: white;
					border-radius: 20px;
					-webkit-appearance: none;
					margin-top: -10px; }

			div.arrow-up img.arrow-up-icon {
				cursor: pointer;
				margin: auto;
				display: block; }

			input[type="range"]#global-large-song-slider {
				width: 100%;
				margin-top: -74px;
				-webkit-appearance: none;
				z-index: 9999;
				background-color: inherit;
				margin-left: auto;
				margin-right: auto;
				display: block; }

			input[type="range"]#global-large-song-slider:focus {
				outline: none; }

			input[type="range"]#global-large-song-slider::-webkit-slider-runnable-track {
				width: 100%;
				cursor: pointer;
				border-radius: 0px;
				height: 68px;
				background-color: rgba(0, 0, 0, 0);
				-webkit-appearance: none; }

			input[type="range"]#global-large-song-slider::-webkit-slider-thumb {
				width: 5px;
				height: 68px;
				background-color: white;
				border-radius: 20px;
				-webkit-appearance: none; }

			input[type="range"]#global-large-song-slider::-moz-range-track {
				width: 100%;
				height: 0px;
				cursor: pointer;
				border-radius: 0px;
				height: 68px;
				background-color: rgba(0, 0, 0, 0); }

			input[type="range"]#global-large-song-slider::-moz-range-thumb {
				width: 5px;
				height: 68px;
				background-color: white;
				border-radius: 20px;
				-webkit-appearance: none;
				margin-top: -34px; }

			input[type="range"]#global-large-song-slider::-ms-track {
				width: 100%;
				height: 4px;
				cursor: pointer;
				border-radius: 0px;
				background: rgba(255, 255, 255, 0.25); }

			input[type="range"]#global-large-song-slider::-ms-fill-lower {
				background: transparent; }

			input[type="range"]#global-large-song-slider::-ms-fill-upper {
				background: transparent; }

			input[type="range"]#global-large-song-slider::-ms-thumb {
				width: 28px;
				height: 28px;
				background-color: white;
				border-radius: 20px;
				-webkit-appearance: none;
				margin-top: -10px; }

			/*
				3. Layout
			*/
			div#visualizations-player {
				width: 325px;
				padding: 25px;
				background-color: #482D57;
				border-radius: 20px;
				margin: auto;
				margin-top: 50px;
				position: relative; }

			/*
				Small only
			*/
			/*
				Medium only
			*/
			/*
				Large Only
			*/
			div#visualizations-player-playlist {
				background-color: #482D57;
				border-radius: 20px;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				padding: 25px;
				padding-top: 25px;
				z-index: 9999;
				display: none; }
				div#visualizations-player-playlist div.top-arrow {
					text-align: center; }
					div#visualizations-player-playlist div.top-arrow img {
						cursor: pointer; }
				div#visualizations-player-playlist div.top {
					border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
					div#visualizations-player-playlist div.top span.playlist-title {
						color: white;
						font-size: 36px;
						font-weight: 700; }
					div#visualizations-player-playlist div.top div.amplitude-shuffle {
						width: 22px;
						height: 13px;
						cursor: pointer;
						float: right;
						margin-top: 22px; }
						div#visualizations-player-playlist div.top div.amplitude-shuffle.amplitude-shuffle-on {
							background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/shuffle-on.svg") no-repeat center; }
						div#visualizations-player-playlist div.top div.amplitude-shuffle.amplitude-shuffle-off {
							background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/shuffle-off.svg") no-repeat center; }
					div#visualizations-player-playlist div.top div.amplitude-repeat {
						width: 25px;
						height: 15px;
						cursor: pointer;
						float: right;
						margin-left: 25px;
						margin-top: 20px; }
						div#visualizations-player-playlist div.top div.amplitude-repeat.amplitude-repeat-on {
							background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/repeat-on.svg") no-repeat center; }
						div#visualizations-player-playlist div.top div.amplitude-repeat.amplitude-repeat-off {
							background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/repeat-off.svg") no-repeat center; }
				div#visualizations-player-playlist div.songs-container {
					padding-top: 35px;
					height: 400px;
					padding-bottom: 90px;
					overflow-y: scroll; }
					div#visualizations-player-playlist div.songs-container div.song {
						margin-bottom: 20px;
						cursor: pointer;
						padding: 5px;
						border-radius: 3px; }
						div#visualizations-player-playlist div.songs-container div.song.amplitude-active-song-container {
							background-color: #03C1EB; }
						div#visualizations-player-playlist div.songs-container div.song:hover {
							background-color: #4CF298; }
						div#visualizations-player-playlist div.songs-container div.song span.song-position {
							color: white;
							font-size: 18px;
							float: left; }
						div#visualizations-player-playlist div.songs-container div.song img.song-album-art {
							width: 44px;
							height: 44px;
							border-radius: 4px;
							box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
							float: left;
							margin-left: 12px;
							margin-right: 16px; }
						div#visualizations-player-playlist div.songs-container div.song div.song-meta-data-container {
							float: left;
							width: calc( 100% - 105px ); }
							div#visualizations-player-playlist div.songs-container div.song div.song-meta-data-container span.song-name {
								font-size: 18px;
								display: block;
								color: white;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis; }
							div#visualizations-player-playlist div.songs-container div.song div.song-meta-data-container span.song-artist {
								font-size: 12px;
								display: block;
								color: white;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis; }
					div#visualizations-player-playlist div.songs-container div.song:after {
						content: "";
						display: table;
						clear: both; }
				div#visualizations-player-playlist div.active-audio {
					background-color: rgba(3, 193, 235, 0.7);
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					height: 40px;
					border-bottom-left-radius: 20px;
					border-bottom-right-radius: 20px;
					padding-top: 20px;
					padding-bottom: 20px;
					padding-left: 25px;
					padding-right: 25px;
					display: flex; }
					div#visualizations-player-playlist div.active-audio img.cover-art-small {
						width: 50px;
						height: 50px;
						border-radius: 4px;
						float: left; }
					div#visualizations-player-playlist div.active-audio div.active-audio-right {
						float: left;
						width: calc( 100% - 50px );
						padding-left: 10px; }
						div#visualizations-player-playlist div.active-audio div.active-audio-right span.song-name {
							font-size: 16px;
							color: white;
							display: block;
							text-align: center;
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis; }
						div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls {
							text-align: center; }
							div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls div.amplitude-prev {
								width: 18px;
								height: 26px;
								display: inline-block;
								background-size: contain;
								background: url(https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/prev.svg) no-repeat center;
								margin-right: 20px;
								vertical-align: middle;
								cursor: pointer; }
							div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls div.amplitude-play-pause {
								display: inline-block;
								width: 24px;
								height: 25px;
								cursor: pointer;
								margin: auto;
								vertical-align: middle; }
								div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls div.amplitude-play-pause.amplitude-paused {
									background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/small-play.svg") no-repeat center;
									background-size: contain; }
								div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls div.amplitude-play-pause.amplitude-playing {
									background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/small-pause.svg") no-repeat center;
									background-size: contain; }
							div#visualizations-player-playlist div.active-audio div.active-audio-right div.active-audio-controls div.amplitude-next {
								width: 18px;
								height: 26px;
								display: inline-block;
								background-size: contain;
								background: url(https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/next.svg) no-repeat center;
								margin-left: 20px;
								vertical-align: middle;
								cursor: pointer; }

			a.learn-more{
				display: block;
				color: white;
				text-align: center;
				width: 300px;
				border-radius: 5px;
				text-decoration: none;
				padding: 10px;
				margin: auto;
				margin-top: 20px;
				background-color: #482D57;
			}
			/*
				Small only
			*/
			/*
				Medium only
			*/
			/*
				Large Only
			*/
			/*
				4. Pages
			*/
			/*
				5. Themes
			*/
			/*
				6. Utils
			*/
			/*
				7. Vendors
			*/

		`));
		$("body").append($(`
			<div id="visualizations-player">
				<div class="top-container">
					<img class="now-playing-album-art" id="large-now-playing-album-art" data-amplitude-song-info="cover_art_url"/>
					<div class="amplitude-visualization" id="large-visualization">

					</div>
					<div class="visualization-toggle visualization-on"></div>
					<div class="amplitude-shuffle"></div>
					<div class="amplitude-repeat"></div>
				</div>

				<div class="meta-data-container">
					<span class="now-playing-name" data-amplitude-song-info="name"></span>
					<span class="now-playing-artist-album">
						<span class="now-playing-artist" data-amplitude-song-info="artist"></span> - <span class="now-playing-album" data-amplitude-song-info="album"></span>
					</span>
				</div>

				<div class="amplitude-wave-form">

				</div>
				<input type="range" class="amplitude-song-slider" id="global-large-song-slider"/>

				<div>
					<span class="amplitude-current-time"></span>

					<span class="amplitude-time-remaining"></span>
				</div>

				<div class="control-container">
					<div class="amplitude-prev">

					</div>

					<div class="amplitude-play-pause amplitude-paused">

					</div>

					<div class="amplitude-next">

					</div>
				</div>

				<div class="song-navigation">
					<input type="range" class="amplitude-song-slider"/>
				</div>

				<div class="arrow-up">
					<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/arrow-up.svg" class="arrow-up-icon"/>
				</div>

				<div id="visualizations-player-playlist">
					<div class="top-arrow">
						<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/arrow-down.svg" class="arrow-down-icon"/>
					</div>

					<div class="top">
						<span class="playlist-title">Songs</span>
						<div class="amplitude-repeat">

						</div>
						<div class="amplitude-shuffle">

						</div>
					</div>

					<div class="songs-container">
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="0">
							<span class="song-position">01</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="0"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="0"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="0"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="1">
							<span class="song-position">02</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="1"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="1"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="1"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="2">
							<span class="song-position">03</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="2"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="2"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="2"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="3">
							<span class="song-position">04</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="3"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="3"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="3"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="4">
							<span class="song-position">05</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="4"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="4"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="4"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="5">
							<span class="song-position">06</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="5"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="5"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="5"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="6">
							<span class="song-position">07</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="6"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="6"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="6"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="7">
							<span class="song-position">08</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="7"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="7"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="7"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="8">
							<span class="song-position">09</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="8"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="8"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="8"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="9">
							<span class="song-position">10</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="9"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="9"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="9"></span>
							</div>
						</div>
						<div class="song amplitude-song-container amplitude-play-pause"	data-amplitude-song-index="10">
							<span class="song-position">11</span>
							<img class="song-album-art" data-amplitude-song-info="cover_art_url" data-amplitude-song-index="10"/>
							<div class="song-meta-data-container">
								<span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="10"></span>
								<span class="song-artist" data-amplitude-song-info="artist" data-amplitude-song-index="10"></span>
							</div>
						</div>
					</div>

					<div class="active-audio">
						<img class="cover-art-small" data-amplitude-song-info="cover_art_url"/>

						<div class="active-audio-right">
							<span class="song-name" data-amplitude-song-info="name"></span>

							<div class="active-audio-controls">
								<div class="amplitude-prev"></div>
								<div class="amplitude-play-pause"></div>
								<div class="amplitude-next"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="pre-load-img-container">
				<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/play.svg"/>
				<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/pause.svg"/>
				<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/next.svg"/>
				<img src="https://521dimensions.com/img/open-source/amplitudejs/examples/visualizations/prev.svg"/>
			</div>
			<a class="learn-more" href="https://serversideup.net/courses/amplitudejs-from-the-ground-up/">Learn More on Server Side Up</a>
			<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stop-color="#03C1EB" />
						<stop offset="100%" stop-color="#86F3B8" />
					</linearGradient>
				</defs>
			</svg>
		`));
		Amplitude.init({
			bindings: {
				37: 'prev',
				39: 'next',
				32: 'play_pause'
			},
			debug: true,
			visualization: 'michaelbromley_visualization',
			songs: [
				{
					"name": "Risin' High (feat Raashan Ahmad)",
					"artist": "Ancient Astronauts",
					"album": "We Are to Answer",
					//"url": "https://521dimensions.com/song/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
					"url":"./lib/data/sound/bell_ring.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "The Gun",
					"artist": "Lorn",
					"album": "Ask The Dust",
					//"url": "https://521dimensions.com/song/08 The Gun.mp3",
					"url":"./lib/data/sound/bell_ring.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Anvil",
					"artist": "Lorn",
					"album": "Anvil",
					//"url": "https://521dimensions.com/song/LORN - ANVIL.mp3",
					"url":"./lib/data/sound/bell_ring.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "I Came Running",
					"artist": "Ancient Astronauts",
					"album": "We Are to Answer",
					"url": "https://521dimensions.com/song/ICameRunning-AncientAstronauts.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "First Snow",
					"artist": "Emancipator",
					"album": "Soon It Will Be Cold Enough",
					"url": "https://521dimensions.com/song/FirstSnow-Emancipator.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Terrain",
					"artist": "pg.lost",
					"album": "Key",
					"url": "https://521dimensions.com/song/Terrain-pglost.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/key.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Vorel",
					"artist": "Russian Circles",
					"album": "Guidance",
					"url": "https://521dimensions.com/song/Vorel-RussianCircles.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/guidance.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Intro / Sweet Glory",
					"artist": "Jimkata",
					"album": "Die Digital",
					"url": "https://521dimensions.com/song/IntroSweetGlory-Jimkata.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Offcut #6",
					"artist": "Little People",
					"album": "We Are But Hunks of Wood Remixes",
					"url": "https://521dimensions.com/song/Offcut6-LittlePeople.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Dusk To Dawn",
					"artist": "Emancipator",
					"album": "Dusk To Dawn",
					"url": "https://521dimensions.com/song/DuskToDawn-Emancipator.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Anthem",
					"artist": "Emancipator",
					"album": "Soon It Will Be Cold Enough",
					"url": "https://521dimensions.com/song/Anthem-Emancipator.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg",
					"visualization": "michaelbromley_visualization"
				}
			],
			waveforms: {
					sample_rate: 50
			},
			visualizations: [
				{
					object: MichaelBromleyVisualization,
					params: {

					}
				}
			]
		});
		document.getElementsByClassName('visualization-toggle')[0].addEventListener('click', function(){
			if( this.classList.contains( 'visualization-off' ) ){
				this.classList.remove('visualization-off');
				this.classList.add('visualization-on');
				document.getElementById('large-now-playing-album-art').style.display = 'none';
				document.getElementById('large-visualization').style.display = 'block';
			}else{
				this.classList.remove('visualization-on');
				this.classList.add('visualization-off');
				document.getElementById('large-now-playing-album-art').style.display = 'block';
				document.getElementById('large-visualization').style.display = 'none';
			}
		});
		document.getElementsByClassName('arrow-up-icon')[0].addEventListener('click', function(){
			document.getElementById('visualizations-player-playlist').style.display = 'block';
		});
		document.getElementsByClassName('arrow-down-icon')[0].addEventListener('click', function(){
			document.getElementById('visualizations-player-playlist').style.display = 'none';
		});
	}
});

