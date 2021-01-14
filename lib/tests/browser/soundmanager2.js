//By wrapping and extending HTML5 and Flash Audio APIs, SoundManager 2 brings reliable cross-platform audio to JavaScript.
//HTML5 Audio() Support
// 100% Flash-free MP3 + MP4/AAC (and OGG, FLAC, etc.) where supported
// Compatible with Apple iPad (iOS 3.2), iPhone/iOS 4 and newer
// Fallback to Flash for MP3/MP4 support, if needed
// SM2 API is transparent; HTML5/flash switching handled internally
// HTML5 API support approximates Flash 8 API features
//https://github.com/scottschiller/SoundManager2/
//http://www.schillmania.com/projects/soundmanager2/
define([
	"module",
	"soundmanager2",
],function(
	module,
	_soundManager
){
	console.log([module.id,'start'].join(':'));
	console.log(_soundManager);
	//basic usage -- namespace issue....
	window.setTimeout(function(){
		soundManager.setup({
		  // where to find flash audio SWFs, as needed
		  //url: '/path/to/swf-files/',
		  onready: function() {
		    // SM2 is ready to play audio!
			// create "mySound"...
			var mySound = soundManager.createSound({
				url: './lib/data/sound/water_droplet.mp3'
			});
			// ...and play it
			mySound.play()
		  }
		});
	},1000);
});
