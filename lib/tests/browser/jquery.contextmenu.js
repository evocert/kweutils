//$.contextMenu is a management facility for - you guessed it - context menus. It was designed for an application where there are hundreds of elements that may show a context menu - so intialization speed and memory usage are kept fairly small. It also allows to register context menus without providing actual markup, as $.contextMenu generates DOMElements as needed.
//https://github.com/swisnl/jQuery-contextMenu
//http://swisnl.github.io/jQuery-contextMenu/demo.html
define([
	"module",
	"jquery",
	"jquery.contextmenu",
	"css!vendor/jquery.contextmenu/2.9.2/jquery.contextMenu.min"
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().contextmenu);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.button{
			margin:8px;
			padding:8px;
			background:#444444;
			color:#888888;
			font-family:monospace;
			text-weight:bold;
			text-transform:uppercase;
		}
			
	`));
	{//basic usage
		var el=$("<span/>").addClass(["button"]).attr({"id":"test0"}).text("right click here");
		$("body").append(el);
		$.contextMenu({
			// define which elements trigger this menu
			selector: "#test0",
			// define the elements of the menu
			items: {
				foo: {name: "Foo", callback: function(key, opt){ alert("Foo!"); }},
				bar: {name: "Bar", callback: function(key, opt){ alert("Bar!") }}
			}
			// there's more, have a look at the demos and docs...
		});
	}
	{//basic usage
		var el=$("<span/>").addClass(["button"]).attr({"id":"test0"}).text("right click here");
		$("body").append(el);
		$.contextMenu({
			// define which elements trigger this menu
			selector: "#test0",
			// define the elements of the menu
			items: {
				foo: {name: "Foo", callback: function(key, opt){ alert("Foo!"); }},
				bar: {name: "Bar", callback: function(key, opt){ alert("Bar!") }},
				baz: {name: "Baz", callback: function(key, opt){ alert("Baz!") }}
			}
			// there's more, have a look at the demos and docs...
		});
	}

});
