define([
	"module",
	"gradstop",
],function(
	module,
	gradstop
){
	console.log([module.id,'start'].join(':'));
	console.log(gradstop);
	{//basic usage
		const gradient = gradstop({
			    stops: 5,
			    inputFormat: 'hex',
			    colorArray: ['#343838', '#00DFFC']
		});

		console.log(gradient);
	}
});
