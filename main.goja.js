<@
	try{
		var GOJA=true;
		eval(fsutils.File2String('./www/security/sjs/test/lib/core/require.goja.js'));
		eval(fsutils.File2String('./www/security/sjs/test/main.js'));
	}catch(e){
		println(e.toString());
	}
@>
