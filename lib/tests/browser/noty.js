//NOTY is a notification library that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.
//The notifications can be positioned at the; top - topLeft - topCenter - topRight - center - centerLeft - centerRight - bottom - bottomLeft - bottomCenter - bottomRight
//There are lots of other options in the API to customise the text, animation, buttons and much more.
//It also has various callbacks for the buttons, opening closing the notifications and queue control
//https://github.com/needim/noty
//https://ned.im/noty/#/installation
define([
	"module",
	"noty",
	"jquery",
	"css!/kweutils/css/bootswatch/slate/bootstrap.min.css",
	"css!vendor/noty/3.2.0/noty.css",
	"css!vendor/noty/3.2.0/themes/sunset.css",
	"css!vendor/noty/3.2.0/themes/metroui.css",
	"css!vendor/noty/3.2.0/themes/bootstrap-v3.css",
	"css!vendor/noty/3.2.0/themes/bootstrap-v4.css",
	"css!vendor/noty/3.2.0/themes/light.css",
	"css!vendor/noty/3.2.0/themes/metroui.css",
	"css!vendor/noty/3.2.0/themes/mint.css",
	"css!vendor/noty/3.2.0/themes/nest.css",
	"css!vendor/noty/3.2.0/themes/relax.css",
	"css!vendor/noty/3.2.0/themes/semanticui.css",
	/*
	*/
],function(
	module,
	Noty,
	jq,
){
	console.log([module.id,'start'].join(':'));
	console.log(Noty);
	$=jq;
	{//basic usage
		var btngroup=$("<div/>").addClass(["btn-group"]);
		var themebuf=[
			"sunset",
			"light",
			"metroui",
			"mint",
			"nest",
			"relax",
			"semanticui",
			"bootstrap-v4"
		];
		themebuf.forEach(function(theme){
			btngroup.append(
				$("<button/>")
				.addClass(["btn","btn-sm"])
				.text(theme)
				.click(function(){
					new Noty({
						theme:theme,
						text:theme
					}).show();
				})
			);
		});
		$("body").append(btngroup);
	}
});
