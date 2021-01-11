//Awesomplete is an ultra lightweight, customizable, simple autocomplete widget with zero dependencies, built with modern standards for modern browsers.
//https://github.com/LeaVerou/awesomplete
//https://projects.verou.me/awesomplete/
define([
	"module",
	"jquery",
	"awesomplete",
	"css!vendor/awesomplete/1.1.5/awesomplete.base.css",
	"css!vendor/awesomplete/1.1.5/awesomplete.css",
	"css!vendor/awesomplete/1.1.5/awesomplete.theme.css",
	"css!vendor/awesomplete/1.1.5/style.css",
	/*
	*/
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
		}
		input{
			background:#444444;
			border:unset;
		}
	`));
	{//basic usage
		var el=$(`
			<input class="awesomplete" list="mylist" />
			<datalist id="mylist">
				<option>Ada</option>
				<option>Java</option>
				<option>JavaScript</option>
				<option>Brainfuck</option>
				<option>LOLCODE</option>
				<option>Node.js</option>
				<option>Ruby on Rails</option>
			</datalist>
		`);
		$("body").append(el);
	}
});
