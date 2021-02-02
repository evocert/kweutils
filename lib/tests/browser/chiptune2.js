//This is a javascript library that can play module music files. It is based on the libopenmpt C/C++ library. To translate libopenmpt into Javascript emscripten was used. For audio output inside the browser WebAudio API is used.
//Please note: The compiled libopenmpt.js in this repository is based on an outdated version of libopenmpt. Newer versions contain bugfixes and other improvements. Download the latest version from the libopenmpt developers here and replace libopenmpt.js.mem and libopenmpt.js.
//If you prefer to compile libopenmpt.js yourself (to save space or make custom changes) follow the instructions in the "Development" section.
//https://github.com/deskjet/chiptune2.js
define([
	"module",
	"chiptune2"
],function(
	module,
	chiptune
){
	console.log([module.id,'start'].join(':'));
	console.log(chiptune);
	try{//basic usage
		player=new chiptune.ChiptuneJsPlayer(new chiptune.ChiptuneJsConfig(-1));
		console.log(player);
		window.player=player;
		player.play("http://localhost:1030/kweutils/lib/data/mod/mysteristerium.mod",function(){});
	}catch(e){console.error(e);};
});
