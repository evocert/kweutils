//Buttons with built-in loading indicators, effectively bridging the gap between action and feedback.
//https://lab.hakim.se/ladda/
//https://github.com/hakimel/Ladda
//note: modifications make to ./lib/vendor/ladda/2.0.1/ladda.amd.js
define([
	"module",
	"jq",
	"ladda",
	"css!/kweutils/css/bootswatch/slate/bootstrap.min.css",
	"css!vendor/ladda/1.0.6/ladda.min.css",
],function(
	module,
	ja,
	Ladda
){
	console.log([module.id,'start'].join(':'));
	console.log(Ladda);
	{//basic usage
		var button=$("<button/>")
			.attr({})
			.css({})
			.addClass(["btn"])
			.text("button")
		;
		$("body").append(button);
		// Create a new instance of ladda for the specified button
		var l = Ladda.create(button[0]);//document.querySelector('.my-button'));
		// Start loading
		l.start();
		// Will display a progress bar for 50% of the button width
		l.setProgress(0.5);
		// Stop loading
		l.stop();
		// Toggle between loading/not loading states
		l.toggle();
		// Check the current state
		l.isLoading();
		// Delete the button's ladda instance
		l.remove();
	}
	{//binding
		// Automatically trigger the loading animation on click
		//Ladda.bind('button[type=submit]');
		// Same as the above but automatically stops after two seconds
		//Ladda.bind('button[type=submit]', {timeout: 2000});
		for(var i=0;i<8;i++){
			var button=$("<button/>")
				.attr({})
				.css({})
				.addClass(["btn"])
				.text("button")
			;
			$("body").append(button);
		}
		Ladda.bind('button', {timeout: 2000});
	}
});
