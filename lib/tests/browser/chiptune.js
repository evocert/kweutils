//This is a javascript library that can play module music files. It is based on the libxmp C library. To translate libxmp into Javascript emscripten was used. Audio output is implemented with the Web Audio API as specified by W3C.
//https://github.com/deskjet/chiptune.js
//https://github.com/deskjet/chiptune.js/blob/master/test.html
define([
	"module",
	"jquery",
	//"libxmp",
	"chiptune",
],function(
	module,
	jq,
	ChiptunePlayer
){
	console.log([module.id,'start'].join(':'));
	console.log(ChiptunePlayer);
	$=jq;
			// support webkit-prefix for chrome (and friends)
			if(window.webkitAudioContext!==undefined){
				AudioContext=webkitAudioContext;
			}
			// support moz-prefix for Firefox (and friends)
			if(window.mozAudioContext!==undefined){
				AudioContext=mozAudioContext;
			}
			var context=new AudioContext();
			window.context=context;
			//https://support.mozilla.org/bm/questions/981939
			var holder={ctx:context}; 
			$(window).on("beforeunload",function(){
				alert('h');
				holder.ctx;
			});
	{//basic usage
		function test(){
			var player=new ChiptunePlayer(context.destination);
			var loop=true;
			var urlbuf=[
				"./lib/data/mod/MangaPart1.mod",
				"./lib/data/mod/Monday.mod",
				"./lib/data/mod/mysteristerium.mod",
				"./lib/data/mod/sound-of-da-lunatic.mod",
				"./lib/data/mod/StardustMemories.mod",
				"./lib/data/mod/Tinytune.mod",
			];
			try{player.unload();}catch(err){};
			player.load(urlbuf[3],loop,function(){
				player.setLooping(true);
				player.play();
			});
		}
		var button=$("<button/>")
			.click(test)
			.text("test")
		;
		$("body").append(button);
		$("body").append($("<pre/>").text(`
Somehow the audio context is invalid if it is not accessed, for now
to get this to work go into the console and just reference globally exposed variable context
then click test
		`));
	}
});
