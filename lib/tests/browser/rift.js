//https://github.com/bendangelo/rift
//Javascript Toolkit for Game Devs. This is not a game engine but a math library. This solves writing the same math formulas over and over. Rift is similar to the Math class, it has no state and its global.
define([
	"module",
	"rift",
],function(
	module,
	Rift
){
	console.log([module.id,'start'].join(':'));
	console.log(Rift);
	{
		var tileSize=30;
		var player={}
		var x=32;
		var y=32;
		var tileX=Rift.tile(x,tileSize);
		var tileY=Rift.tile(y,tileSize);
		player.x = tileX * tileSize;
		player.y = tileY * tileSize;
		console.log(tileX);
		console.log(tileY);
		console.log(player);
	}
	{
		var tileSize=30;
		var player={}
		var x=32;
		var y=32;
		var isoX = Rift.isoX(x, y, tileSize);
		var isoY = Rift.isoY(x, y, tileSize);
		player.x = Rift.worldIsoX(isoX, isoY, tileSize);
		player.y = Rift.worldIsoY(isoX, isoY, tileSize);
		console.log(isoX);
		console.log(isoY);
		console.log(player);
	}
	{
		/*
var player = new Player();

// return integer number between 20 - 100
var randomGold = Rift.randomInt(20, 100);

player.giveGold(randomGold);

// return random element
var randomItem = Rift.random([item1, item2]);

player.giveItem(randomItem);

player.stats = {str: 10, dex: 5, vit: 4, int: 7};

// return random property
var randomStatDown = Rift.random(player.stats);

player.stats[randomStatDown] /= 2;
		*/
	}
	{
		/*
		var distance = Rift.distance(player.x, player.y, monster.x, monster.y);
		if(Rift.hitTest(player.x, player.y, player.width, player.height,monster.x, monster.y, monster.width, monster.height)){
			// we hit
		}
		*/
	}
});
