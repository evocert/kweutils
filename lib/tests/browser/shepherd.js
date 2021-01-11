//guided tour library
//https://github.com/shipshapecode/shepherd
//note:depends on tether.js
define([
	"module",
	"jquery",
	"shepherdjs",
	"css!vendor/shepherd/1.8.1/shepherd.css",
	"css!vendor/shepherd/1.8.1/shepherd-theme-arrows-plain-buttons.min.css",
/*
	"css!vendor/shepherd/1.8.1/shepherd-theme-arrows.min.css",
	"css!vendor/shepherd/1.8.1/shepherd-theme-dark.min.css",
	"css!vendor/shepherd/1.8.1/shepherd-theme-default.min.css",
	"css!vendor/shepherd/1.8.1/shepherd-theme-square-dark.min.css",
	"css!vendor/shepherd/1.8.1/shepherd-theme-square.min.css"
*/
	"css!vendor/shepherd/1.8.1/shepherd-theme-arrows-fix.css",
],function(
	module,
	jq,
	Shepherd,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(Shepherd);
	{//basic usage
		$=jq;
		$("body").append($("<style/>").text(`
			html,body{
				background:#222222;
				font-family:monospace;
				color:#CCCCCC;
				padding:8px;
			}
			a{
				color:#CCCCCC;
			}
		`));
		$("body").append($("<a/>").attr({"id":"step-0","href":"#"}).text("test 0"));
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"id":"step-1","href":"#"}).text("test 1"))
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"id":"step-2","href":"#"}).text("test 2"))
		$("body").append($("<br/>"));
		$("body").append($("<a/>").attr({"id":"step-3","href":"#"}).text("test 3"))
		$("body").append($("<br/>"));
		$("body").append($("<div/>").addClass("example-css-selector"));
		//introJs().start();
		const tour = new Shepherd.Tour({
			  defaultStepOptions: {
					//classes: 'shadow-md bg-purple-dark',
					scrollTo: true,
					classes: 'shepherd-theme-default'
				    }
		});
		tour.addStep({
			id:'step-0',
			text:'This is the <i>first</i> step',
			attachTo: {
				element: '.example-css-selector',
				on: 'bottom'
			},
			classes: 'example-step-extra-class',
			buttons: [
				{
					text: 'Next',
					action: tour.next
				}
			]
		});
		tour.addStep({
			id:'step-1',
			text:'This is the <i>second</i> step',
			attachTo: {
				element: '.example-css-selector',
				on: 'bottom'
			},
			classes: 'example-step-extra-class',
			buttons: [
				{
					text: 'Next',
					action: tour.next
				}
			]
		});
		tour.start();
	}
});
