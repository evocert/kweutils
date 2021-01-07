define([
	"module",
	"console",
	"cyclejs",
	"jquery",
	"odometer",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-car.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-default.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-digital.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-minimal.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-plaza.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-slot-machine.css",
	"css!vendor/odometer/0.4.7/themes/odometer-theme-train-station.css",
	/*
	*/
],function(
	module,
	console,
	cyclejs,
	jq,
	Odometer
){
	console.log([module.id,'start'].join(':'));
	console.log(Odometer);
	$=jq;
	{//basic usage
		$("body").css({
			"background":"#222222",
		});
		["default","car","digital","minimal","plaza","slot-machine","train-station"].forEach(function(theme){
			var el=$("<div/>").css({
				"font-size":"80px",
				"line-height":"100px",
				"padding":"8px"
			});
			$("body").append(el);
			var options=window.odometerOptions={
				auto:false,			// Don't automatically initialize everything with class 'odometer'
				selector:".my-numbers",	// Change the selector used to automatically find things to be animated
				format:"(,ddd).dd",		// Change how digit groups are formatted, and how many digits are shown after the decimal point
				duration:3000,			// Change how long the javascript expects the CSS animation to take
				theme:theme,			// Specify the theme (if you have more than one theme css file on the page)
				animation:"count",		// Count is a simpler animation method which just increments the value, use it when you're looking for something more subtle.
				el:el[0]			//element
			};
			od=new Odometer(options)
			od.update(1985)
			// or
			//el.innerHTML = 555
		});
	}
});
