<@
	//vdom
	var GOJA={};
	var document=null;
	var window=null;
	try{
		//var CONFIG="www/kweutils/lib/config.goja.nobase";
		var CONFIG="www/kweutils/lib/config.goja";
		var MAIN="../apps/goja1/goja2/main";
		/*
		var CONFIG="www/kweutils/lib/config.goja.nobase";
		var MAIN=action().Path().substring(1).split('/');
		MAIN.pop();
		MAIN.unshift('www');
		MAIN.push('main');
		MAIN=MAIN.join("/");
		*/
		//bootstrap
		require([CONFIG],function(){require([MAIN],function(){});});
	}catch(e){
		println(e.toString());
	}
@>

