//A JavaScript library for detecting touch gestures.
//https://github.com/hammerjs/hammer.js
//note: fix up demo
define([
	"module",
	"jquery",
	"hammerjs",
],function(
	module,
	jq,
	Hammer
){
	console.log([module.id,'start'].join(':'));
	console.log(Hammer);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.expand{
			background:red;
		}
	`));
	{//basic usage

		var el=$("<div/>").css({"background":"#444444","width":"256px","height":"256px","padding":"24px"}).text("try me");
		$("body").append(el);
		var manager = new Hammer.Manager(el[0]);
		// Create a recognizer.
		var TripleTap = new Hammer.Tap({
			event: 'tripletap',
			taps: 3
		});
		// Add the recognizer to the manager.
		manager.add(TripleTap);
		// Create an instance of Hammer with the reference.
		var hammer = new Hammer(el[0]);
		// Subscribe to a quick start event: press, tap, or doubletap.
		// For a full list of quick start events, read the documentation.
		hammer.on('click', function(e) {
		//hammer.on('press', function(e) {
		//hammer.on('tripletap'/*'press'*/, function(e) {
			alert('press');
		});
	}
});
