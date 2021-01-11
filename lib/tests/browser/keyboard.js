//https://github.com/RobertWHurst/KeyboardJS
define([
	"module",
	"keyboardjs",
],function(
	module,
	keyboardJS
){
	console.log([module.id,'start'].join(':'));
	console.log(keyboardJS);
	{//basic usage
		keyboardJS.bind('a', (e) => {
			console.log('a is pressed');
		});
		keyboardJS.bind('a + b', (e) => {
			console.log('a and b is pressed');
		});
		keyboardJS.bind('a + b > c', (e) => {
			console.log('a and b then c is pressed');
		});
		keyboardJS.bind(['a + b > c', 'z + y > z'], (e) => {
			console.log('a and b then c or z and y then z is pressed');
		});
		keyboardJS.bind('', (e) => {
			console.log('any key was pressed');
		});
		//alt, shift, ctrl, etc must be lowercase
		keyboardJS.bind('alt + shift > a', (e) => {
			console.log('alt, shift and a is pressed');
		});

		// keyboardJS.bind === keyboardJS.on === keyboardJS.addListener
	}
});
