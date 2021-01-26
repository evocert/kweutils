<@
	//2021/01/19 16:22:59.008133 LOG:    config.goja.js:start
	//runtime error: slice bounds out of range [957:0]
require=null;
requirejs=null;
define=null;
eval(fsutils.File2String("./www/kweutils/lib/vendor/requirejs/require.evocert.js"));
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
		configpath="./lib";
		//bootstrap
		require([configpath],function(console){
			require(["app/main.goja"],function(){});
		});
	}catch(e){
		println(e.toString());//console.log(e.toString());
	}
@>
