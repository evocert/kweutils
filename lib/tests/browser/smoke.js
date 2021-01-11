//Notify or get approval from your users quickly and with style. This alert system uses css animations and background (so there are no images or js animation code...so it's really lightweight).
//https://github.com/hxgf/smoke.js
//https://smoke.js.org/docs/
define([
	"module",
	"smokejs",
	"css!vendor/smokejs/smoke.css",
	"css!vendor/smokejs/themes/dark.css",
	/*
	"css!vendor/smokejs/themes/100s.css",
	"css!vendor/smokejs/themes/default.css",
	"css!vendor/smokejs/themes/tiger.css",
	*/
],function(
	module,
	smoke
){
	console.log([module.id,'start'].join(':'));
	console.log(smoke);
	{//basic usage
smoke.alert("Can I ask you a question?", function(e){
	
}, {
	ok: "Yep",
	cancel: "Nope",
	classname: "custom-class"
});

smoke.confirm("Are you sure?", function(e){
	if (e){

	}else{

	}
}, {
	ok: "Yep",
	cancel: "Nope",
	classname: "custom-class",
	reverseButtons: true
});

smoke.prompt("What's for dinner?", function(e){
	if (e){

	}else{
	
	}
}, {
	ok: "Yes",
	cancel: "No",
	classname: "custom-class",
	reverseButtons: true,
	value: "existential dread"
});
smoke.quiz("Which is your favorite?", function(e){
	if (e == "A"){

	}
}, {
	button_1: "A",
	button_2: "B",
	button_3: "C",
	button_4: "D",
	button_cancel: "Nothing"
});
smoke.signal("Congratulations! You have just one a free iPod Touch!", function(e){

}, {
	duration: 3000,
	classname: "custom-class"
});

	}
});
