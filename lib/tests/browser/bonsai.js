define([
	"module",
	"bonsai",
],function(
	module,
	bonsai
){
	console.log([module.id,'start'].join(':'));
	bonsai.run(document.body,{
		code:function(){
			new Rect(10,10,100,100)
				.addTo(stage)
				.attr('fillColor','green');
		},
		width:500,
		height:400
	});
});
