define([
	"module",
	"jquery",
	"onfontload",
],function(
	module,
	jq,
	onFontLoad
){
	console.log([module.id,'start'].join(':'));
	console.log(onFontLoad);
	$=jq;
	{//basic usage
		$("head").append($(`<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>`));
		$("head").append($(`<link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>`));
		onFontLoad([
			{family: 'Open Sans'},
			{family: 'Roboto', weight: 400},
			{family: 'Roboto', weight: 700},
		], function() {
			console.log('All fonts loaded');
		});
	}
});
