<@
	try{
		var GOJA=true;
		eval(fsutils.File2String('./www/kweutils/lib/core/require.goja.js'));
		eval(fsutils.File2String('./www/kweutils/main.js'));
	}catch(e){
		println(e.toString());
	}
@>
