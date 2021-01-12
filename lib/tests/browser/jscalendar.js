//Just a simple javascript calendar
//https://github.com/GramThanos/jsCalendar/
//https://gramthanos.github.io/jsCalendar/docs.html
define([
	"module",
	"jquery",
	"jscalendar",
	"css!vendor/jscalendar/1.4.4/jsCalendar.min.css",
	"css!vendor/jscalendar/1.4.4/extensions/jsCalendar.eventmarks.css",
	"css!vendor/jscalendar/1.4.4/jsCalendar.darkseries.min.css",
	"css!vendor/jscalendar/1.4.4/jsCalendar.micro.min.css",
	"css!vendor/jscalendar/1.4.4/themes/jsCalendar.clean.min.css",
	"css!vendor/jscalendar/1.4.4/themes/jsCalendar.darkseries.min.css",
	"css!vendor/jscalendar/1.4.4/themes/jsCalendar.micro.min.css",
],function(
	module,
	jq,
	jsCalendar
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
		}
	`));
	require(["vendor/jscalendar/1.4.4/jsCalendar.lang.af"],function(){
		{
			var el=$(`<div class="auto-jsCalendar black-theme" data-day-format="DDD"></div>`);
			$("body").append(el);
			var cal=new jsCalendar(el[0]);
			cal.setLanguage("af");
		}
		{
			var el=$(`<div class="auto-jsCalendar black-theme micro-theme" ></div>`);
			$("body").append(el);
			var cal=new jsCalendar(
				el[0],
				"now",
				{
					"zeroFill": "true",
					"monthFormat": "month YYYY"
				}
			);
			cal.setLanguage("af");
			cal.onDateClick(function(event, date){
				console.log(date);
			});
			cal.onMonthChange(function(event, date){
				console.log(date);
			});
		}
	});
});
