//simply JS benchmark function
//https://github.com/kmpatel/microBench
define([
	"module",
	"jquery",
	"ubenchmark",
],function(
	module,
	jq,
	uBench
){
	console.log([module.id,'start'].join(':'));
	console.log(uBench);
	$=jq;
	{//basic usage
		$("body").append($("<div/>"));
		console.log(uBench( "document.querySelectorAll('div')"                 ));
		/*
		uBench( document.querySelectorAll.bind(document,'div')     )
		uBench( document.querySelectorAll.bind(document), ['div']  )
		uBench( function(){ document.querySelectorAll('div') }     )
		uBench( function(s){document.querySelectorAll(s)}, ['div'] )
		uBench( () => document.querySelectorAll('div')             )  // browser with arrow-func
		uBench( s  => document.querySelectorAll(s), ['div']        )  
		*/
	}
});
