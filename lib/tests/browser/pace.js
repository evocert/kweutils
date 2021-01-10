//An automatic web page progress bar.
//https://github.com/CodeByZach/pace
//https://codebyzach.github.io/pace/
//https://codebyzach.github.io/pace/docs/
//note: not playing along nicely with ajax overrides
define([
	"module",
	"jquery",
	"axios",
	"pace",
	"css!vendor/pace/1.2.3/pace-theme-default.min.css"
],function(
	module,
	jq,
	axios,
	pace
){
	console.log([module.id,'start'].join(':'));
	console.log(pace);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	{//set options
		/*
		window.paceoptions={
			// Disable the 'elements' source
			elements: false,

			// Only show the progress on regular and ajax-y page navigation,
			// not every request
			restartOnRequestAfter: false
		};
		*/
		/*
		<script data-pace-options='{ "ajax": false }' src='pace.js'></script>
		*/
		pace.start({
			ajax: true, // disabled
			//document: true, // disabled
			//className: 'my-custom-class'
			//eventLag: true, // disabled
			//elements: {
			//	selectors: ['.my-page']
			//}
		});
	}
	{//test
		/* ... issue
		axios.get("./index.html").then(function(data){
			console.log(data);
		});
		*/

	} 
		$.ajax({
			url:"asdf.html",
			success: function(result){
				console.log(result);
			}
		});


});
