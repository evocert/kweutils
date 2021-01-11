//Powerful, highly customizable vanilla JavaScript engine to drive the user's focus across the page
//
// Simple: is simple to use and has no external dependency at all
// Highly customizable: has a powerful API and can be used however you want
// Highlight anything: highlight any (literally any) element on page
// Feature introductions: create powerful feature introductions for your web applications
// Focus shifters: add focus shifters for users
// User friendly: Everything is controllable by keyboard
// Consistent behavior: usable across all browsers (including in-famous IE)
// MIT Licensed: free for personal and commercial use
//
//https://github.com/kamranahmedse/driver.js
define([
	"module",
	"driverjs",
	"jquery",
	"css!vendor/driverjs/0.9.7/driver.min.css"
],function(
	module,
	Driver,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log(Driver);
	$=jq;
	{//basic usage
		$("body").append($("<div/>").attr({"id":"div0"}).text("div0"));
		$("body").append($("<div/>").attr({"id":"div1"}).text("div0"));
		$("body").append($("<div/>").attr({"id":"div2"}).text("div2"));
		$("body").append($("<div/>").attr({"id":"div3"}).text("div3"));
		const driver = new Driver();
		driver.highlight('#div0');
	}
});
