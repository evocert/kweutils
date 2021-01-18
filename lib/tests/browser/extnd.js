//Extend is based off Jon Resig's Simple JavaScript Inhertitance blog post with the added support for multiple inheritance and AMD & CommonJS loaders. It is also lint-free and removes a superfluous check which breaks Closure Compiler. This inheritence system has been tested on large production apps for desktop and mobile.
//It is recommended you import extnd.js using a CommonJS or AMD loader. Otherwise Class will be added to window and you could have name collisions.
//https://github.com/DominicTobias/extnd
define([
	"module",
	"extnd",
],function(
	module,
	Class
){
	console.log([module.id,'start'].join(':'));
	console.log(Class);
	{//basic usage
		var Animal = Class.extnd({
			init: function (name) {
				this.name = name;
			},

			getName: function () {
				return this.name;
			}
		});

		var Bird = Animal.extnd({
			init: function () {
				this._super.apply(this, arguments);
				console.log('Animal says my name is', this.getName());
			}
		});

		//this._super([arg1[, arg2[, ...]]);
		//this._super.call(thisArg[, arg1[, arg2[, ...]]);
		//this._super.apply(thisArg, [argsArray]);

		var HummingBird = Animal.extnd(Bird).extnd({
			flapsVeryFast: true,
			carefulWithThisObject: {
				flapCount: 0
			},

			fastFlapping: function () {
				// wow, much flapping
				this.carefulWithThisObject.flapCount++;
			}
		});
	}
});
