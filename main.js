try{
	//--------------------------------------------------------------------------------
	//globals
	//--------------------------------------------------------------------------------
	var DBALIAS='mydb';
	var LOOPDB=false;
	//--------------------------------------------------------------------------------
	//main function
	//--------------------------------------------------------------------------------
	//--- browser
	require.config({
		urlArgs: "cachebust="+(new Date()).getTime(),
		paths:{
			"db":"lib/core/db",
			"class":"lib/core/class.goja",
			"console":"lib/core/console",
			"alert":"lib/core/alert",
			"idutils":"lib/core/idutils",
			"Application":"lib/system/Application",
			"Module":"lib/system/Module",
			"System":"lib/system/System",
			'jquery':'lib/vendor/jquery/jquery',
			'jquery-private':'lib/vendor/jquery/jquery-private',
			'underscore':'lib/vendor/underscore/underscore',
		},
		map:{
			'*':{'jquery':'jquery-private'},
			'jquery-private':{'jquery':'jquery'}
		}
	});
	require([
		'console',
		'alert',
		'System',
		'Module',
		'Application',
		'db',
		'underscore',
	],function(console,alert,System,Module,Application,db,_){
	});
}catch(e){
	console.log(e.toString());
}
