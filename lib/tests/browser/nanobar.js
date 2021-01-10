//Very lightweight progress bars (~699 bytes gzipped).
//https://github.com/jacoborus/nanobar
//http://nanobar.jacoborus.codes/
define([
	"module",
	"jquery",
	"nanobar"
],function(
	module,
	jq,
	Nanobar
){
	console.log([module.id,'start'].join(':'));
	console.log(Nanobar);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	{//basic usage
		$("body").append($("<style/>").text(`
			.nanobar0{
				background: url('./lib/vendor/nanobar/img/rainbow.gif') 100%;
				height: 2px;
			}
		`));
		var div=$("<div/>")
			.attr({
			})
			.css({
				"margin":"8px",
				"padding":"8px",
				"background":"#444444",
				"color":"#CCCCCC",
				"font-family":"monospace",
			})
		;
		$("body").append(div);
		var options = {
			classname:'nanobar0',
			//id: 'my-id',
			target:div[0]
		};

		var nanobar = new Nanobar( options );

		//move bar
		nanobar.go( 30 ); // size bar 30%
		nanobar.go( 76 ); // size bar 76%

		// size bar 100% and and finish
		nanobar.go(100);
	}
});
