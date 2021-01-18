//Micro library that interfaces with the HTML5 Gamepad API and publishes gamepad update events.
//https://github.com/likethemammal/gamepad-micro/
define([
	"module",
	"gamepadmicro",
],function(
	module,
	GamepadMicro
){
	console.log([module.id,'start'].join(':'));
	console.log(GamepadMicro);
	{//basic usage
		var gp = new GamepadMicro();
		gp.onUpdate(function(gamepads) {
			if (gp.gamepadConnected) {
				// Parse gamepads
			} else {
				// Gamepad disconnected
			}
		});
	}
});
