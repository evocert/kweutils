define([
	"module",
	"jquery",
	"conzole",
],function(
	module,
	jq,
	conzole
){
	console.log([module.id,'start'].join(':'));
	console.log(conzole);
	$=jq;
	{//basic usage
		$("body").append($("<button/>").text("open console").click(function(){
			conzole.open();
		}));
		$("body").append($("<button/>").text("close console").click(function(){
			conzole.close();
		}));
		$("body").append($("<button/>").text("toggle console").click(function(){
			conzole.toggle();
		}));
		conzole.watching.foo=42;
		$("body").append($("<button/>").text("inc foo").click(function(){
			conzole.watching.foo++;
		}));

	}
});
