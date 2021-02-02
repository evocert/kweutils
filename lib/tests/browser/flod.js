//https://github.com/photonstorm/FlodJS
//https://github.com/photonstorm/FlodJS/blob/master/Flod%20JS%202.1/index.htm
define([
	"module",
	"cyclejs",
	"flod.all",
	/*
	"flod.Core",
	//including the ProTracker player
	"flod.Amiga",
	"flod.PTPlayer",
	//including the FastTracker II player
	"flod.Soundblaster",
	"flod.F2Player"
	*/
],function(
	module,
	cycle,
	flod,
	/*
	flodCore,
	flodAmiga,
	flodPTPlayer,
	flodSoundblaster,
	flodF2Player
	*/
){
	console.log([module.id,'start'].join(':'));
	console.log(cycle.decycle(flod));
	{//basic usage - todo
		window.flod=flod;
		flod.FileLoader.load("./lib/data/mod/Monday.mod");
	}
	/*
	console.log(cycle.decycle(flodCore));
	console.log(cycle.decycle(flodAmiga));
	console.log(cycle.decycle(flodPTPlayer));
	console.log(cycle.decycle(flodSoundblaster));
	console.log(cycle.decycle(flodF2Player));
	*/
});

