//Gitter An awesome and lightweight library for performing spotlight in your DOM elements, setting an animated overlay to the rest of the page. You can find a live demo here.
//https://github.com/zzarcon/focusable
//note: jquery plugin not attaching correctly???
define([
	"module",
	"jquery",
	"jquery.focusable",
],function(
	module,
	jq,
	Focusable
){
	console.log([module.id,'start'].join(':'));
	console.log(Focusable);
	{//basic usage
		$=jq;
		var el0=$("<div/>").text("test0");
		var el1=$("<div/>").text("test1");
		var el2=$("<div/>").text("test2");
		var el3=$("<div/>").text("test3");
		$("body").append(el0);
		$("body").append(el1);
		$("body").append(el2);
		$("body").append(el3);
		window.el0=el0;
		window.Focusable=Focusable;
		//Focusable.setFocus(el0,{});//not working
		//el0.focusable()//does work in console, not here
		Focusable.setFocus(el0)//does work in console, not here
		
	}
});
