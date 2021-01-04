<@
	//vdom
	var GOJA={};
	var document=null;
	var window=null;
	try{
		//portability
		var configpath="www/kweutils/lib/config.goja"
		require([configpath],function(){
			var rootpath=action().Path().substring(0,action().Path().lastIndexOf("/"));
			var mainpath="www"+[rootpath,"main.js"].join("/");
			require([mainpath],function(){});
		});
	}catch(e){
		console.Log(e.toString());
	}
@>

