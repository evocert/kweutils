<@
	//vdom
	var GOJA={};
	var document=null;
	var window=null;
	try{
		//portability
		var configpath=action().Path().substring(1).split('/');
		configpath.pop();
		configpath.unshift('www');
		configpath.push('config.goja');
		configpath=configpath.join("/");
		//bootstrap
		require([configpath],function(console){
			require(["app/main.goja"],function(){});
		});
	}catch(e){
		console.Log(e.toString());
	}
@>
